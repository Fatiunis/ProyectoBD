import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css"; // Mantiene el estilo del navbar

const NavbarInterno = () => {
    const { usuarioActual } = useContext(AuthContext);

    // Si el usuario está autenticado y su rol es "admin" o "cajero", NO mostramos este navbar
    if (usuarioActual && (usuarioActual.rol === "admin" || usuarioActual.rol === "cajero")) {
        return null; // No renderizar el navbar
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold text-white" to="/">Farmacia</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link text-white" to="/medicamentos">Medicamentos</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/historia">Historia</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/faq">FAQ</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarInterno;
