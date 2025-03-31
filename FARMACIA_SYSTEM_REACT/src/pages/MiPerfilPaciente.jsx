import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const MiPerfilPaciente = () => {
  const { usuarioActual } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 Mi Perfil</h2>
      <div className="card p-4 shadow">
        <p><strong>Usuario:</strong> {usuarioActual?.usuario}</p>
        <p><strong>Rol:</strong> {usuarioActual?.rol}</p>
        <p><strong>Email:</strong> paciente1@correo.com (ejemplo)</p>
        <hr />
        <h5>📄 Historial de recetas (simulado)</h5>
        <ul>
          <li>Receta #001 – Paracetamol – 2 cajas – 12/03/2025</li>
          <li>Receta #002 – Amoxicilina – 1 caja – 05/02/2025</li>
        </ul>
      </div>
    </div>
  );
};

export default MiPerfilPaciente;
