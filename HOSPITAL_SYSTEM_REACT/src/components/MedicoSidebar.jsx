import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaUserMd, FaCalendarCheck, FaUsers, FaFilePrescription, FaComments, FaSignOutAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import "../styles/AdminSidebar.css"; 
import LogoutButton from "../components/LogoutButton";

const MedicoSidebar = () => {
    const location = useLocation();

    return (
        <div className="admin-sidebar"> {/* Usa la clase correcta del CSS */}
            <Link to="/medico/dashboard" className="admin-title-link">
                Portal Médico
            </Link>

            <Nav className="flex-column">
                <Nav.Link
                    as={Link}
                    to="/medico/dashboard"
                    className={location.pathname === "/medico/dashboard" ? "active" : ""}
                >
                    <FaUserMd className="icon" /> Dashboard
                </Nav.Link>

                <Nav.Link
                    as={Link}
                    to="/medico/agenda"
                    className={location.pathname === "/medico/agenda" ? "active" : ""}
                >
                    <FaCalendarCheck className="icon" /> Mi Agenda
                </Nav.Link>

                <Nav.Link
                    as={Link}
                    to="/medico/pacientes"
                    className={location.pathname === "/medico/pacientes" ? "active" : ""}
                >
                    <FaUsers className="icon" /> Pacientes Atendidos
                </Nav.Link>

                <Nav.Link
                    as={Link}
                    to="/medico/recetas"
                    className={location.pathname === "/medico/recetas" ? "active" : ""}
                >
                    <FaFilePrescription className="icon" /> Recetas Médicas
                </Nav.Link>

                <Nav.Link
                    as={Link}
                    to="/medico/comentarios"
                    className={location.pathname === "/medico/comentarios" ? "active" : ""}
                >
                    <FaComments className="icon" /> Comentarios
                </Nav.Link>
            </Nav>

            <div className="logout-container">
                <LogoutButton className="logout-button">
                    <FaSignOutAlt className="icon" /> Cerrar Sesión
                </LogoutButton>
            </div>
        </div>
    );
};

export default MedicoSidebar;
