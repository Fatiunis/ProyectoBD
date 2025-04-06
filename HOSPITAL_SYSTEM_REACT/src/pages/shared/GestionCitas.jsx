import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Row, Col } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/GestionCitas.css";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const GestionCitas = () => {
  const [citas, setCitas] = useState([]);
  const [filtros, setFiltros] = useState({ paciente: "", doctor: "", fecha: "", estado: "" });
  const [vistaCalendario, setVistaCalendario] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState({
    id: null,
    paciente: "",
    doctor: "",
    especialidad: "",
    fecha: "",
    hora: "",
    estado: "Pendiente",
    observaciones: ""
  });

  // Control de acceso por rol
  const userRole = sessionStorage.getItem("rol");
  if (userRole !== "admin" && userRole !== "Empleado") {
    return <p className="text-danger text-center mt-4">⚠ No tienes permisos para ver esta sección.</p>;
  }

  useEffect(() => {
    fetch("/data/citas.json")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((err) => console.error("Error al cargar citas:", err));
  }, []);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleShowModal = (cita = null) => {
    if (cita) {
      setModoEdicion(true);
      setCitaSeleccionada(cita);
    } else {
      setModoEdicion(false);
      setCitaSeleccionada({
        id: null,
        paciente: "",
        doctor: "",
        especialidad: "",
        fecha: "",
        hora: "",
        estado: "Pendiente",
        observaciones: ""
      });
    }
    setShowModal(true);
  };

  const handleGuardar = () => {
    if (modoEdicion) {
      setCitas((prev) =>
        prev.map((c) => (c.id === citaSeleccionada.id ? citaSeleccionada : c))
      );
    } else {
      const nuevaCita = {
        ...citaSeleccionada,
        id: citas.length + 1
      };
      setCitas([...citas, nuevaCita]);
    }
    setShowModal(false);
  };

  const handleEliminar = (id) => {
    setCitas(citas.filter((c) => c.id !== id));
  };

  const citasFiltradas = citas.filter((c) => {
    return (
      c.paciente.toLowerCase().includes(filtros.paciente.toLowerCase()) &&
      c.doctor.toLowerCase().includes(filtros.doctor.toLowerCase()) &&
      (filtros.fecha === "" || c.fecha === filtros.fecha) &&
      (filtros.estado === "" || c.estado === filtros.estado)
    );
  });

  const eventos = citas.map((cita) => {
    const start = new Date(`${cita.fecha}T${cita.hora}`);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);
    return {
      id: cita.id,
      title: `${cita.paciente} - ${cita.doctor}`,
      start,
      end,
      resource: cita
    };
  });

  return (
    <div className="gestion-citas-container">
      <h2 className="titulo">Gestión de Citas</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => handleShowModal()}>
          + Nueva Cita
        </Button>
        <Button variant="outline-primary" onClick={() => setVistaCalendario(!vistaCalendario)}>
          {vistaCalendario ? "Ver Tabla" : "Ver Calendario"}
        </Button>
      </div>

      {!vistaCalendario ? (
        <>
          <Form className="mb-3">
            <Row>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="paciente"
                  placeholder="Filtrar por paciente"
                  value={filtros.paciente}
                  onChange={handleFiltroChange}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="doctor"
                  placeholder="Filtrar por doctor"
                  value={filtros.doctor}
                  onChange={handleFiltroChange}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={filtros.fecha}
                  onChange={handleFiltroChange}
                />
              </Col>
              <Col md={3}>
                <Form.Select name="estado" value={filtros.estado} onChange={handleFiltroChange}>
                  <option value="">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Realizada">Realizada</option>
                  <option value="Cancelada">Cancelada</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Doctor</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.paciente}</td>
                  <td>{cita.doctor}</td>
                  <td>{cita.especialidad}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.estado}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => handleShowModal(cita)} className="me-2">
                      Editar
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleEliminar(cita.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={(evento) => handleShowModal(evento.resource)}
            messages={{
              next: "Sig",
              previous: "Ant",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "No hay citas para mostrar en este rango."
            }}
          />
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Cita" : "Nueva Cita"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                type="text"
                value={citaSeleccionada.paciente}
                onChange={(e) =>
                  setCitaSeleccionada({ ...citaSeleccionada, paciente: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                value={citaSeleccionada.doctor}
                onChange={(e) =>
                  setCitaSeleccionada({ ...citaSeleccionada, doctor: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                type="text"
                value={citaSeleccionada.especialidad}
                onChange={(e) =>
                  setCitaSeleccionada({ ...citaSeleccionada, especialidad: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={citaSeleccionada.fecha}
                    onChange={(e) =>
                      setCitaSeleccionada({ ...citaSeleccionada, fecha: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    value={citaSeleccionada.hora}
                    onChange={(e) =>
                      setCitaSeleccionada({ ...citaSeleccionada, hora: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={citaSeleccionada.estado}
                onChange={(e) =>
                  setCitaSeleccionada({ ...citaSeleccionada, estado: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={citaSeleccionada.observaciones}
                onChange={(e) =>
                  setCitaSeleccionada({ ...citaSeleccionada, observaciones: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardar}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionCitas;
