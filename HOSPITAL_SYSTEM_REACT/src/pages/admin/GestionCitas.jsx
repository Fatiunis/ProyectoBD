import { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isBefore } from "date-fns";
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
  const [vistaCalendario, setVistaCalendario] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch("/data/citas.json")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((err) => console.error("Error al cargar citas:", err));
  }, []);

  const handleShowModal = (cita) => {
    setCitaSeleccionada(cita);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCitaSeleccionada(null);
  };

  const handleGuardarCita = () => {
    if (citaSeleccionada.id) {
      setCitas((prev) =>
        prev.map((c) => (c.id === citaSeleccionada.id ? citaSeleccionada : c))
      );
    } else {
      const nuevaCita = { ...citaSeleccionada, id: citas.length + 1 };
      setCitas([...citas, nuevaCita]);
    }
    handleCloseModal();
  };

  const eventos = citas.map((cita) => {
    const start = new Date(`${cita.fecha}T${cita.hora}`);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    return {
      id: cita.id,
      title: `${cita.paciente} - ${cita.doctor}`,
      start,
      end,
      past: isBefore(end, new Date()),
      resource: cita,
    };
  });

  return (
    <div className="gestion-citas-container">
      <h2 className="titulo">Gestión de Citas</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => setVistaCalendario(!vistaCalendario)}>
          {vistaCalendario ? "Ver Tabla" : "Ver Calendario"}
        </Button>
      </div>

      {!vistaCalendario ? (
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
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.paciente}</td>
                <td>{cita.doctor}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.estado}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleShowModal(cita)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["month", "week", "day", "agenda"]}
            defaultView={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            step={30}
            showMultiDayTimes
            popup
            selectable
            onSelectSlot={(slotInfo) => {
              setCitaSeleccionada({
                paciente: "",
                doctor: "",
                especialidad: "",
                fecha: format(slotInfo.start, "yyyy-MM-dd"),
                hora: format(slotInfo.start, "HH:mm"),
                estado: "Pendiente",
              });
              setShowModal(true);
            }}
            onSelectEvent={(evento) => handleShowModal(evento.resource)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.past ? "#a71d2a" : "#1f9b1f",
                color: "white",
                borderRadius: "4px",
                padding: "2px 4px",
              },
            })}
            messages={{
              today: "Hoy",
              next: "Sig",
              previous: "Ant",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              noEventsInRange: "No hay citas para este período.",
            }}
          />
        </div>
      )}

      {/* Modal para agregar/editar cita */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{citaSeleccionada?.id ? "Editar Cita" : "Nueva Cita"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {citaSeleccionada && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Paciente</Form.Label>
                <Form.Control
                  type="text"
                  value={citaSeleccionada.paciente}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, paciente: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Doctor</Form.Label>
                <Form.Control
                  type="text"
                  value={citaSeleccionada.doctor}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, doctor: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Especialidad</Form.Label>
                <Form.Control
                  type="text"
                  value={citaSeleccionada.especialidad}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, especialidad: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={citaSeleccionada.fecha}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, fecha: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  value={citaSeleccionada.hora}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, hora: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardarCita}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionCitas;
