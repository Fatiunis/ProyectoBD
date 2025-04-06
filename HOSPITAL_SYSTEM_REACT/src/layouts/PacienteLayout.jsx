import { Outlet } from "react-router-dom";
import PacienteSidebar from "../components/PacienteSidebar"; // o Navbar si prefieres
import "../styles/PacienteLayout.css";

const PacienteLayout = () => {
  return (
    <div className="paciente-layout">
      <PacienteSidebar />
      <div className="paciente-content">
        <Outlet />
      </div>
    </div>
  );
};

export default PacienteLayout;
