import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ClienteDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-danger">Bienvenido, {usuario.nombre}</h2>

        {/* Sección: Estado de Póliza */}
        <section className="mt-4">
          <h4>📜 Estado de tu Póliza</h4>
          <p><strong>Tipo:</strong> {usuario.rol === "cliente" ? "Plan Premium (90% Cobertura)" : "Plan Básico (70% Cobertura)"}</p>
          <p><strong>Vence el:</strong> 30 de Diciembre de 2024</p>
          <p><strong>Estado de pagos:</strong> Al día</p>
        </section>

        {/* Sección: Historial de Servicios */}
        <section className="mt-4">
          <h4>📋 Historial de Servicios</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hospital</th>
                <th>Costo Total</th>
                <th>Copago</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/03/2024</td>
                <td>Hospital Central</td>
                <td>Q250</td>
                <td>Q200</td>
                <td>Consulta General</td>
              </tr>
              <tr>
                <td>05/03/2024</td>
                <td>Clínica San Juan</td>
                <td>Q500</td>
                <td>Q450</td>
                <td>Examen de Laboratorio</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Sección: Notificaciones */}
        <section className="mt-4">
          <h4>🔔 Notificaciones</h4>
          <p>📢 Tu última solicitud médica ha sido aprobada.</p>
          <p>⚠️ Recuerda que tu próximo pago vence el 10 de Abril.</p>
        </section>

        {/* Sección: Calendario de Solicitudes */}
        <section className="mt-4">
          <h4>📅 Calendario de Solicitudes</h4>
          <p>🔵 Consulta programada para el 15 de marzo en Hospital Central.</p>
          <p>🔴 Solicitud de medicamento rechazada el 10 de marzo.</p>
        </section>

        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>
      
    </div>
  );
};

export default ClienteDashboard;
