import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const rolesDisponibles = ["admin", "empleado", "paciente", "usuario_sin_registrar"];

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");

    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [correoNuevo, setCorreoNuevo] = useState("");
    const [contrasenaNueva, setContrasenaNueva] = useState("");

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        fetch("http://localhost/sistema_adfs/usuarios_listar.php")
            .then((res) => res.json())
            .then((data) => setUsuarios(data));
    };

    const actualizarUsuario = async (usuario) => {
        const response = await fetch("http://localhost/sistema_adfs/usuarios_actualizar.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });

        const data = await response.json();
        alert(data.message);
        fetchUsuarios();
    };

    const guardarEdicion = async () => {
        const response = await fetch("http://localhost/sistema_adfs/usuarios_editar.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: usuarioEditando.id,
                correo: correoNuevo,
                contrasena: contrasenaNueva,
            }),
        });

        const data = await response.json();
        alert(data.message);
        setUsuarioEditando(null);
        setCorreoNuevo("");
        setContrasenaNueva("");
        fetchUsuarios();
    };

    const filtrarUsuarios = usuarios.filter((u) =>
        u.correo.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🧑‍💼 Administración de Usuarios</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por correo..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarUsuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                <select
                                    className="form-select"
                                    value={usuario.rol || ""}
                                    onChange={(e) =>
                                        setUsuarios((prev) =>
                                            prev.map((u) =>
                                                u.id === usuario.id
                                                    ? { ...u, rol: e.target.value }
                                                    : u
                                            )
                                        )
                                    }
                                >
                                    <option value="">Sin rol</option>
                                    {rolesDisponibles.map((rol) => (
                                        <option key={rol} value={rol}>
                                            {rol}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <span className={`badge ${usuario.estado === "1" ? "bg-success" : "bg-secondary"}`}>
                                    {usuario.estado === "1" ? "Activo" : "Inactivo"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() =>
                                        actualizarUsuario({
                                            ...usuario,
                                            estado: usuario.estado === "1" ? 0 : 1,
                                        })
                                    }
                                >
                                    {usuario.estado === "1" ? "Desactivar" : "Activar"}
                                </button>

                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => actualizarUsuario(usuario)}
                                >
                                    Guardar Rol
                                </button>

                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => {
                                        setUsuarioEditando(usuario);
                                        setCorreoNuevo(usuario.correo);
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar */}
            {usuarioEditando && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "#00000088" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuario #{usuarioEditando.id}</h5>
                                <button className="btn-close" onClick={() => setUsuarioEditando(null)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Correo</label>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    value={correoNuevo}
                                    onChange={(e) => setCorreoNuevo(e.target.value)}
                                />
                                <label>Contraseña nueva (opcional)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={contrasenaNueva}
                                    onChange={(e) => setContrasenaNueva(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setUsuarioEditando(null)}>Cancelar</button>
                                <button className="btn btn-primary" onClick={guardarEdicion}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsuarios;
