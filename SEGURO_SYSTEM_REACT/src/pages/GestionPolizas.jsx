import React, { useEffect, useState } from "react";
import { Card, Table, Button, Form, Row, Col } from "react-bootstrap";
import {
  obtenerPolizas,
  insertarPoliza,
  actualizarPoliza,
  eliminarPoliza,
} from "../services/polizasService";

const GestionPolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    cobertura_porcentaje: "",
    monto_minimo: "",
    activa: 1,
  });

  // Cargar pólizas desde la base de datos
  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerPolizas();
      setPolizas(data);
    };
    cargarDatos();
  }, []);

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      cobertura_porcentaje: "",
      monto_minimo: "",
      activa: 1,
    });
    setEditandoId(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarAgregar = async () => {
    if (!formulario.nombre || !formulario.cobertura_porcentaje || !formulario.monto_minimo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    let response;
    if (editandoId) {
      response = await actualizarPoliza({ ...formulario, id: editandoId });
    } else {
      response = await insertarPoliza(formulario);
    }

    if (response.success) {
      alert(response.message);
      const data = await obtenerPolizas();
      setPolizas(data);
      limpiarFormulario();
    } else {
      alert("Error: " + response.message);
    }
  };

  const manejarEditar = (poliza) => {
    setEditandoId(poliza.id);
    setFormulario({
      nombre: poliza.nombre || "",
      cobertura_porcentaje: poliza.cobertura_porcentaje || "",
      monto_minimo: poliza.monto_minimo || "",
      activa: poliza.activa === "1" ? 1 : 0,
    });
  };

  const manejarEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta póliza?")) {
      const response = await eliminarPoliza(id);
      if (response.success) {
        alert(response.message);
        const data = await obtenerPolizas();
        setPolizas(data);
      } else {
        alert("Error: " + response.message);
      }
    }
  };

  const filtradas = polizas.filter((p) =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Card className="p-4 shadow">
      <h4>📑 Gestión de Pólizas</h4>

      {/* Filtro */}
      <Form.Group className="my-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre de póliza..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Form.Group>

      {/* Formulario */}
      <Form className="mb-4">
        <Row className="mb-2">
          <Col md={3}>
            <Form.Control
              name="nombre"
              placeholder="Nombre de la Póliza"
              value={formulario.nombre}
              onChange={manejarCambio}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="cobertura_porcentaje"
              type="number"
              placeholder="% Cobertura"
              value={formulario.cobertura_porcentaje}
              onChange={manejarCambio}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="monto_minimo"
              type="number"
              placeholder="Monto mínimo"
              value={formulario.monto_minimo}
              onChange={manejarCambio}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              name="activa"
              value={formulario.activa}
              onChange={manejarCambio}
            >
              <option value="1">Activa</option>
              <option value="0">Inactiva</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="success" onClick={manejarAgregar}>
              {editandoId ? "Actualizar" : "Agregar"}
            </Button>
          </Col>
          <Col md={1}>
            <Button variant="secondary" onClick={limpiarFormulario}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Tabla */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>% Cobertura</th>
            <th>Monto Mínimo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.cobertura_porcentaje}%</td>
              <td>Q{parseFloat(p.monto_minimo).toFixed(2)}</td>
              <td>{p.activa === "1" || p.activa === 1 ? "Activa" : "Inactiva"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => manejarEditar(p)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => manejarEliminar(p.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default GestionPolizas;
