import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
  try {
      const res = await fetch("http://localhost/Proyecto_ADFS_BD/sistema_adfs/auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      
      console.log("Datos enviados:", credentials);
      console.log("Respuesta cruda:", res); // verificar
  
      const data = await res.json();
      
      console.log("Respuesta JSON:", data);// verificar
  
      if (data.success) {
        sessionStorage.setItem("rol", data.usuario.rol.toLowerCase());
        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
  
        const rol = data.usuario.rol.toLowerCase(); // <--- conversión segura
        sessionStorage.setItem("rol", rol);
        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (rol === "admin") {
          navigate("/admin");
        } else if (rol === "empleado") {
          navigate("/empleado/citas");
        } else if (rol === "paciente") {
          navigate("/paciente/dashboard");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de servidor. Intenta más tarde.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              value={credentials.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
