import { useState, useEffect } from "react";
import { Button, Card, Dropdown, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import "../../styles/GestionDoctores.css";

const GestionDoctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState({
    id: null,
    nombre: "",
    especialidad: "",
    colegiado: "",
    foto: "",
    universidad: "",
    fechaGraduacion: "",
    telefonos: [""],
    titulos: [""]
  });
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  useEffect(() => {
    fetch("/data/medicos.json")
      .then((response) => response.json())
      .then((data) => setDoctores(data))
      .catch((error) => console.error("Error al cargar doctores:", error));
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setModoEdicion(false);
    setDoctorSeleccionado({
      id: null,
      nombre: "",
      especialidad: "",
      colegiado: "",
      foto: "",
      universidad: "",
      fechaGraduacion: "",
      telefonos: [""],
      titulos: [""]
    });
  };

  const handleShow = (doctor = null) => {
    if (doctor) {
      setModoEdicion(true);
      setDoctorSeleccionado(doctor);
    } else {
      setModoEdicion(false);
      setDoctorSeleccionado({
        id: null,
        nombre: "",
        especialidad: "",
        colegiado: "",
        foto: "",
        universidad: "",
        fechaGraduacion: "",
        telefonos: [""],
        titulos: [""]
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modoEdicion) {
      setDoctores((prevDoctores) =>
        prevDoctores.map((d) =>
          d.id === doctorSeleccionado.id ? doctorSeleccionado : d
        )
      );
    } else {
      const nuevoDoctor = {
        ...doctorSeleccionado,
        id: doctores.length + 1
      };
      setDoctores((prevDoctores) => [...prevDoctores, nuevoDoctor]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setDoctores((prevDoctores) => prevDoctores.filter((d) => d.id !== id));
  };

  const handleTelefonoChange = (index, value) => {
    const nuevos = [...doctorSeleccionado.telefonos];
    nuevos[index] = value;
    setDoctorSeleccionado({ ...doctorSeleccionado, telefonos: nuevos });
  };

  const handleTituloChange = (index, value) => {
    const nuevos = [...doctorSeleccionado.titulos];
    nuevos[index] = value;
    setDoctorSeleccionado({ ...doctorSeleccionado, titulos: nuevos });
  };

  return (
    <div className="gestion-doctores-container">
      <h2 className="titulo">Gestión de Doctores</h2>
      <Button variant="outline-success" className="boton-agregar" onClick={() => handleShow()}>
        + Agregar Doctor
      </Button>

      <div className="doctores-lista">
        {doctores.map((doctor) => (
          <Card key={doctor.id} className="doctor-card">
            <Card.Img variant="top" src={doctor.foto} alt={doctor.nombre} className="doctor-img" />
            <Card.Body>
              <Card.Title>{doctor.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {doctor.especialidad} | Nº {doctor.colegiado}
              </Card.Subtitle>
              <div className="extra-info">
                <small>{doctor.universidad}</small><br />
                <small>Graduado: {doctor.fechaGraduacion}</small><br />
                {doctor.telefonos.map((tel, i) => (
                  <Badge bg="secondary" className="me-1" key={i}>{tel}</Badge>
                ))}
                <div className="titulos-preview mt-2">
                  {doctor.titulos.map((img, idx) => (
                    <img
                      key={idx}
                      src={img || "/assets/tituloG.png"}
                      alt={`Título ${idx + 1}`}
                      className="titulo-mini"
                      onClick={() => setImagenAmpliada(img || "/assets/tituloG.png")}
                    />
                  ))}
                </div>
              </div>
              <div className="doctor-menu">
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="menu-icon">
                    &#x22EE;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShow(doctor)}>Editar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(doctor.id)}>Eliminar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Doctor" : "Agregar Doctor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorSeleccionado.nombre}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, nombre: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorSeleccionado.especialidad}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, especialidad: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>No. de Colegiado</Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorSeleccionado.colegiado}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, colegiado: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Universidad</Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorSeleccionado.universidad}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, universidad: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Fecha de Graduación</Form.Label>
                  <Form.Control
                    type="date"
                    value={doctorSeleccionado.fechaGraduacion}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, fechaGraduacion: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Foto (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorSeleccionado.foto}
                    onChange={(e) =>
                      setDoctorSeleccionado({ ...doctorSeleccionado, foto: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Teléfonos</Form.Label>
                  {doctorSeleccionado.telefonos.map((tel, i) => (
                    <Form.Control
                      key={i}
                      type="text"
                      className="mb-1"
                      value={tel}
                      onChange={(e) => handleTelefonoChange(i, e.target.value)}
                    />
                  ))}
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Fotos de Títulos (URL)</Form.Label>
                  {doctorSeleccionado.titulos.map((tit, i) => (
                    <Form.Control
                      key={i}
                      type="text"
                      className="mb-1"
                      value={tit}
                      onChange={(e) => handleTituloChange(i, e.target.value)}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>
            {modoEdicion ? "Guardar Cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!imagenAmpliada} onHide={() => setImagenAmpliada(null)} centered>
        <Modal.Body className="text-center">
          <img src={imagenAmpliada} alt="Título ampliado" style={{ maxWidth: "100%" }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GestionDoctores;
