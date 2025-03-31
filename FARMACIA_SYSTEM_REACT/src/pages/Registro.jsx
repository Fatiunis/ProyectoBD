import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Registro = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost/sistema_adfs/registro.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                correo,
                password,
            }),
        });

        const data = await response.json();
        setMensaje(data.message);

        if (data.success) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h2 className="text-center">Registro de Usuario</h2>
                {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;
