import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Páginas
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Proveedores from "./pages/Proveedores";
import AccesoDenegado from "./pages/AccesoDenegado";
import Medicamentos from "./pages/Medicamentos";
import MedicamentoDetalle from "./pages/MedicamentoDetalle";
import Inventario from "./pages/Inventario";
import Historia from "./pages/Historia";
import FAQ from "./pages/FAQ";
import Contacto from "./pages/Contacto";
import MiPerfilPaciente from "./pages/MiPerfilPaciente"; // ✅ Ruta protegida para pacientes
import Registro from "./pages/Registro"; // ⬅️ importa el componente
import AdminUsuarios from "./pages/AdminUsuarios";

// Componente para proteger rutas según el rol del usuario
const PrivateRoute = ({ element, roles }) => {
  const { usuarioActual } = useContext(AuthContext);
  return usuarioActual && roles.includes(usuarioActual.rol)
    ? element
    : <AccesoDenegado />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas (accesibles para todos) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/medicamentos" element={<Medicamentos />} />
      <Route path="/medicamentos/:id" element={<MedicamentoDetalle />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas protegidas para Admin y Empleado */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} roles={["admin", "empleado"]} />} />
      <Route path="/ventas" element={<PrivateRoute element={<Ventas />} roles={["admin", "empleado"]} />} />
      <Route path="/clientes" element={<PrivateRoute element={<Clientes />} roles={["admin", "empleado"]} />} />
      <Route path="/productos" element={<PrivateRoute element={<Productos />} roles={["admin"]} />} />
      <Route path="/proveedores" element={<PrivateRoute element={<Proveedores />} roles={["admin"]} />} />
      <Route path="/admin/usuarios" element={<PrivateRoute element={<AdminUsuarios />} roles={["admin"]} />} />

      {/* Ruta protegida para Paciente */}
      <Route path="/mi-perfil" element={<PrivateRoute element={<MiPerfilPaciente />} roles={["paciente"]} />} />

      {/* Ruta de fallback para Acceso Denegado */}
      <Route path="*" element={<AccesoDenegado />} />
    </Routes>
  );
};

export default AppRoutes;
