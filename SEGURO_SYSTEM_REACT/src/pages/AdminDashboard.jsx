import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import AdminModules from "./AdminModules";
import GestionPolizas from "./GestionPolizas";


const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [modulosActivos, setModulosActivos] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedModules = localStorage.getItem("adminModules");

    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate("/");
    }

    if (storedModules) {
      const activos = JSON.parse(storedModules).filter((mod) => mod.enabled);
      setModulosActivos(activos);
    }
  }, [navigate]);

  if (!usuario) return null;

  const dataPólizas = [
    { name: "Plan Básico", value: 40 },
    { name: "Plan Premium", value: 60 },
  ];

  const COLORS = ["#8B0000", "#FFD700"];

  return (
    <Tab.Container defaultActiveKey="dashboard">
      <div className="d-flex">
        {/* Sidebar Dinámico */}
        <div className="sidebar">
          <h4 className="text-center text-white p-3">Admin Panel</h4>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="dashboard">📊 Dashboard</Nav.Link>
            </Nav.Item>

            {modulosActivos.map((mod) => (
              <Nav.Item key={mod.key}>
                <Nav.Link eventKey={mod.key}>🧩 {mod.name}</Nav.Link>
              </Nav.Item>
            ))}

            <Nav.Item>
              <Nav.Link onClick={logout}>🚪 Cerrar Sesión</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Contenido Principal */}
        <div className="main-content flex-grow-1 p-4">
          <h2 className="text-danger">Bienvenido, {usuario.nombre}</h2>

          <Tab.Content>
            <Tab.Pane eventKey="dashboard">
              <Card className="p-4 shadow">
                <h4>📊 Estadísticas Generales</h4>
                <Row>
                  <Col md={6}>
                    <h5>Distribución de Pólizas</h5>
                    <PieChart width={300} height={300}>
                      <Pie
                        data={dataPólizas}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataPólizas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </Col>
                  <Col md={6}>
                    <h5>Últimos Movimientos</h5>
                    <ul>
                      <li>✔️ Aprobada cobertura para paciente Juan Pérez</li>
                      <li>❌ Rechazada solicitud de medicamento</li>
                      <li>📋 Nueva póliza registrada para Ana López</li>
                    </ul>
                  </Col>
                </Row>
              </Card>
            </Tab.Pane>

            {/* PANE: Usuarios */}
            <Tab.Pane eventKey="usuarios">
              <Card className="p-4 shadow">
                <h4>👥 Gestión de Usuarios</h4>
                <button className="btn btn-primary">Agregar Nuevo Usuario</button>
              </Card>
            </Tab.Pane>

            

            <Tab.Pane eventKey="polizas">
              <GestionPolizas />
            </Tab.Pane>


            {/* PANE: Cobertura */}
            <Tab.Pane eventKey="cobertura">
              <Card className="p-4 shadow">
                <h4>✅ Validación de Cobertura</h4>
                <button className="btn btn-primary">Verificar Cobertura</button>
              </Card>
            </Tab.Pane>

            {/* PANE: Seguridad */}
            <Tab.Pane eventKey="seguridad">
              <Card className="p-4 shadow">
                <h4>🔒 Seguridad y Auditoría</h4>
                <button className="btn btn-primary">Ver Registros de Auditoría</button>
              </Card>
            </Tab.Pane>

            {/* PANE: Módulos (AdminModules.jsx) */}
            <Tab.Pane eventKey="modulos">
              <AdminModules />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};

export default AdminDashboard;
