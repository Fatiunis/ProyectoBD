import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && password === "1234") {
      login({ nombre: "Administrador", rol: "admin" });
      navigate("/admin-dashboard");
    } else if (user === "cliente" && password === "5678") {
      login({ nombre: "Cliente", rol: "cliente" });
      navigate("/cliente-dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
          <h2 className="text-center mb-4">Inicio de Sesión</h2>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
