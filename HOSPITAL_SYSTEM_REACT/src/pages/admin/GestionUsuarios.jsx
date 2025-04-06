import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import "../../styles/GestionUsuarios.css";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Estado para el nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    correo: "",
    contrasena: "",
    rol: "paciente",
  });

  // Manejar cambios en el formulario del modal
  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  // Guardar usuario (por ahora solo imprime en consola)
  const handleCrearUsuario = () => {
    console.log("Usuario a crear:", nuevoUsuario);
    setShowModal(false);
  };

  useEffect(() => {
    fetch("http://localhost/sistema_adfs/obtener_usuarios.php")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  return (
    <div className="gestion-usuarios-container">
      <h2 className="titulo">Gestión de Usuarios</h2>

      {/* Botón para abrir el modal */}
      <Button variant="success" className="mb-3 mt-2" onClick={() => {
        console.log("Botón clickeado, abriendo modal...");
        setShowModal(true);
        }}>
        + Agregar Usuario
     </Button>
     
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={nuevoUsuario.correo} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="contrasena" value={nuevoUsuario.contrasena} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={nuevoUsuario.rol} onChange={handleChange}>
                <option value="admin">Administrador</option>
                <option value="empleado">Empleado</option>
                <option value="paciente">Paciente</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrearUsuario}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionUsuarios;
