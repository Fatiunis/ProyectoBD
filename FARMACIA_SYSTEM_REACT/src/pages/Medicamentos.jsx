import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import medicamentosData from "../data/medicamentos.json";

const Medicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        // Cargar directamente desde el JSON (no usar localStorage por ahora)
        setMedicamentos(medicamentosData);
    }, []);

    const filtrarMedicamentos = (e) => {
        const texto = e.target.value.toLowerCase();
        setBusqueda(texto);

        const base = medicamentosData;

        setMedicamentos(
            base.filter(
                (med) =>
                    med.nombre.toLowerCase().includes(texto) ||
                    med.principioActivo.toLowerCase().includes(texto) ||
                    med.marca.toLowerCase().includes(texto)
            )
        );
    };

    return (
        <div className="container" style={{ marginTop: "8rem", paddingTop: "3rem" }}>
            <h2 className="text-center mb-4">💊 Medicamentos Disponibles</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre, principio activo o marca..."
                    value={busqueda}
                    onChange={filtrarMedicamentos}
                />
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {medicamentos.length === 0 ? (
                    <div className="col">
                        <div className="alert alert-warning text-center">No se encontraron medicamentos.</div>
                    </div>
                ) : (
                    medicamentos.map((med) => (
                        <div key={med.id || med.codigo} className="col">
                            <div className="card shadow h-100">
                                <img
                                    src={med.foto}
                                    alt={med.nombre}
                                    className="card-img-top img-fluid rounded"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                    onError={(e) => (e.target.src = "/default.jpg")}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{med.nombre}</h5>
                                    <p className="card-text"><strong>Principio Activo:</strong> {med.principioActivo}</p>
                                    <p className="card-text"><strong>Marca:</strong> {med.marca}</p>
                                    <p className="card-text"><strong>Presentación:</strong> {med.presentacion}</p>
                                    <p className="card-text"><strong>Disponibles:</strong> {med.stock} unidades</p>
                                    <p className="card-text"><strong>Precio:</strong> Q{Number(med.precio).toFixed(2)}</p>
                                    <Link to={`/medicamentos/${med.id || med.codigo}`} className="btn btn-primary w-100">
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Medicamentos;
