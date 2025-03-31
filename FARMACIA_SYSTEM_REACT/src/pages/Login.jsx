import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/sistema_adfs/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: usuario,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const user = {
                    usuario: data.usuario.nombre,
                    rol: data.usuario.rol,
                    id: data.usuario.id,
                };

                // Guardar en localStorage y actualizar el contexto
                localStorage.setItem("usuario", JSON.stringify(user));
                login(user); // Aquí se actualiza el contexto global

                // Redirección según el rol
                if (user.rol === "admin" || user.rol === "empleado") {
                    navigate("/dashboard");
                } else if (user.rol === "paciente") {
                    navigate("/mi-perfil");
                } else {
                    navigate("/");
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Error en el login:", err);
            setError("❌ Error de conexión con el servidor.");
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su correo"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
