import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AccesoDenegado = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="alert alert-danger" role="alert">
                    <h2 className="alert-heading">Acceso Denegado</h2>
                    <p>No tienes permisos para acceder a esta página.</p>
                </div>
                <Link to="/dashboard" className="btn btn-primary">Volver al Dashboard</Link>
            </div>
        </div>
    );
};

export default AccesoDenegado;
