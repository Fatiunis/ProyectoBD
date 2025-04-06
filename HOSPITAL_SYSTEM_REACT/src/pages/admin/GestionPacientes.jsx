import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/GestionPacientes.css";

const GestionPacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [filtros, setFiltros] = useState({ nombre: "", fechaRegistro: "" });
  const [showModal, setShowModal] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // Validación de acceso por rol
  const userRole = sessionStorage.getItem("rol");
  if (userRole !== "admin") {
    return <p className="text-danger text-center mt-4">⚠ Solo el administrador puede gestionar pacientes.</p>;
  }

  useEffect(() => {
    fetch("http://localhost/Proyecto_ADFS_BD/sistema_adfs/obtener_pacientes.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Pacientes obtenidos:", data); //  Verifica si imprime datos
        setPacientes(data);
      })
      .catch((err) => console.error("Error al cargar pacientes:", err));
  }, []);


  const handleChangeFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleShowModal = (paciente = null) => {
    setPacienteSeleccionado(paciente ? { ...paciente } : { nombre: "", correo: "", telefono: "", fechaRegistro: "", activo: true });
    setShowModal(true);
  };

  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
    (filtros.fechaRegistro === "" || p.fechaRegistro === filtros.fechaRegistro)
  );

  return (
    <div className="gestion-pacientes-container">
      <h2 className="titulo">Gestión de Pacientes</h2>
      
      <div className="filtros-container">
        <Form.Control type="text" placeholder="Buscar por nombre" name="nombre" value={filtros.nombre} onChange={handleChangeFiltro} />
        <Form.Control type="date" name="fechaRegistro" value={filtros.fechaRegistro} onChange={handleChangeFiltro} />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
            <th>Documento</th>
            <th>Afiliación Seguro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientesFiltrados.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombre}</td>
              <td>{paciente.correo}</td>
              <td>{paciente.fecha_nacimiento}</td>
              <td>{paciente.documento_identidad}</td>
              <td>{paciente.num_afiliacion_seguro}</td>
              <td>{paciente.activo ? <span className="text-success">Activo</span> : <span className="text-danger">Inactivo</span>}</td>
              <td>
                <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/pacientes/${paciente.id}`)}>
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GestionPacientes;
