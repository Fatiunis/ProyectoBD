import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";

const TempNavbar = () => {
    const { usuarioActual, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${!isHome || scrolled ? "bg-dark navbar-dark shadow" : ""}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/logo-farmacia.png" className="logo" alt="Logo" />
                    Farmacia
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/medicamentos">Medicamentos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/historia">Historia</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/faq">FAQ</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>

                        {usuarioActual ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-info fw-bold">
                                        {usuarioActual.correo}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="btn btn-primary btn-login" to="/login">Iniciar Sesión</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TempNavbar;
