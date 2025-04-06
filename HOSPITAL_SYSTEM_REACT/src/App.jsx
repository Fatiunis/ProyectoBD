import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import PacienteLayout from "./layouts/PacienteLayout";

// Portal general
import Home from "./pages/portalG/Home";
import FAQ from "./pages/portalG/FAQ";
import Contacto from "./pages/PortalG/Contacto";
import Nosotros from "./pages/portalG/Nosotros";
import EspecialidadesM from "./pages/portalG/EspecialidadesM";
import ListaMedicos from "./pages/portalG/ListaMedicos";
import LoginPage from "./pages/PortalG/LoginPage";

// Admin
import AdminHome from "./pages/admin/AdminHome";
import GestionUsuarios from "./pages/admin/GestionUsuarios";
import GestionDoctores from "./pages/admin/GestionDoctores";
import GestionServicios from "./pages/admin/GestionServicios";
import GestionEspecialidades from "./pages/admin/GestionEspecialidades";
import GestionPacientes from "./pages/admin/GestionPacientes";
import Reportes from "./pages/admin/Reportes";
import Configuracion from "./pages/admin/Configuracion";
import AdminUsuarios from './pages/admin/AdminUsuarios';

// Medicos
import MedicoDashboard from './pages/medico/MedicoDashboard';
import AgendaMedico from './pages/medico/AgendaMedico';

// Paciente
import PacienteDashboard from "./pages/paciente/PacienteDashboard";
import PacientePerfil from "./pages/paciente/PacientePerfil";

// Compartidas
import GestionCitas from "./pages/shared/GestionCitas";
import PacienteDetalle from "./pages/shared/PacienteDetalle";

// Nuevo componente de protección
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <Router>
      <Routes>
        {/* Portal General */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/especialidadesM" element={<EspecialidadesM />} />
          <Route path="/lista-medicos" element={<ListaMedicos />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Panel Administrador */}
        <Route
          path="/admin/*"
          element={
            <RutaProtegida rolPermitido="admin">
              <AdminLayout />
            </RutaProtegida>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="citas" element={<GestionCitas />} />
          <Route path="doctores" element={<GestionDoctores />} />
          <Route path="servicios" element={<GestionServicios />} />
          <Route path="especialidades" element={<GestionEspecialidades />} />
          <Route path="pacientes" element={<GestionPacientes />} />
          <Route path="pacientes/:id" element={<PacienteDetalle />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="usuarios-admin" element={<AdminUsuarios />} />
        </Route>

        {/* Panel Paciente */}
        <Route
          path="/paciente/*"
          element={
            <RutaProtegida rolPermitido="paciente">
              <PacienteLayout />
            </RutaProtegida>
          }
        >
          <Route path="dashboard" element={<PacienteDashboard />} />
          <Route path="perfil" element={<PacientePerfil />} />
        </Route>

        {/* Panel Médico */}
        <Route
          path="/medico/dashboard"
          element={
            <RutaProtegida rolPermitido="doctor">
              <MedicoDashboard />
            </RutaProtegida>
          }
        />
        <Route
          path="/medico/agenda"
          element={
            <RutaProtegida rolPermitido="doctor">
              <AgendaMedico />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
