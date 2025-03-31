import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import medicamentosData from "../data/medicamentos.json";

const MedicamentoDetalle = () => {
    const { id } = useParams();
    const medicamento = medicamentosData.find((med) => med.id === parseInt(id));
    const [comentarios, setComentarios] = useState(medicamento?.comentarios || []);
    const [nuevoComentario, setNuevoComentario] = useState("");

    if (!medicamento) {
        return <div className="alert alert-warning text-center">Medicamento no encontrado.</div>;
    }

    const agregarComentario = () => {
        if (!nuevoComentario.trim()) return;
        const nuevo = {
            id: comentarios.length + 1,
            usuario: "Usuario",
            texto: nuevoComentario,
            respuestas: []
        };
        setComentarios([...comentarios, nuevo]);
        setNuevoComentario("");
    };

    const responderComentario = (comentarioId, texto) => {
        if (!texto.trim()) return;
        const actualizarComentarios = (lista) =>
            lista.map((comentario) =>
                comentario.id === comentarioId
                    ? { ...comentario, respuestas: [...comentario.respuestas, { id: Date.now(), usuario: "Usuario", texto, respuestas: [] }] }
                    : { ...comentario, respuestas: actualizarComentarios(comentario.respuestas) }
            );
        setComentarios(actualizarComentarios(comentarios));
    };

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <div className="card shadow p-4">
                    <h2 className="text-center">{medicamento.nombre}</h2>
                    <div className="text-center">
                        <img src={medicamento.foto} alt={medicamento.nombre} className="img-fluid rounded mb-3" style={{ maxWidth: "300px" }} />
                    </div>
                    <p><strong>Principio Activo:</strong> {medicamento.principioActivo}</p>
                    <p><strong>Descripción:</strong> {medicamento.descripcion}</p>
                    <p><strong>Marca:</strong> {medicamento.marca}</p>
                </div>

                <div className="card shadow p-4 mt-4">
                    <h3>Comentarios</h3>
                    {comentarios.length === 0 ? (
                        <p className="alert alert-info">No hay comentarios aún.</p>
                    ) : (
                        <ul className="list-group">
                            {comentarios.map((comentario) => (
                                <li key={comentario.id} className="list-group-item">
                                    <p><strong>{comentario.usuario}:</strong> {comentario.texto}</p>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => {
                                        const respuesta = prompt("Escribe tu respuesta");
                                        if (respuesta) responderComentario(comentario.id, respuesta);
                                    }}>
                                        Responder
                                    </button>
                                    {comentario.respuestas.length > 0 && (
                                        <ul className="list-group mt-2">
                                            {comentario.respuestas.map((respuesta) => (
                                                <li key={respuesta.id} className="list-group-item">
                                                    <p><strong>{respuesta.usuario}:</strong> {respuesta.texto}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Escribe un comentario..."
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={agregarComentario}>Agregar Comentario</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicamentoDetalle;
