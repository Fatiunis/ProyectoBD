import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import {
    FiMenu,
    FiHome,
    FiShoppingCart,
    FiUsers,
    FiBox,
    FiTruck,
    FiDatabase,
    FiMoon,
    FiSun,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = () => {
    const { usuarioActual } = useContext(AuthContext);
    const { temaOscuro, toggleTema } = useContext(ThemeContext);
    const [colapsado, setColapsado] = useState(false);

    return (
        <div className={`sidebar ${colapsado ? "colapsado" : ""} ${temaOscuro ? "dark-sidebar" : ""}`}>
            <button className="menu-btn" onClick={() => setColapsado(!colapsado)}>
                <FiMenu />
            </button>

            <h2 className={colapsado ? "hidden" : ""}>Farmacia</h2>

            <ul>
                <li>
                    <Link to="/dashboard">
                        <FiHome /> <span className={colapsado ? "hidden" : ""}>Inicio</span>
                    </Link>
                </li>
                <li>
                    <Link to="/ventas">
                        <FiShoppingCart /> <span className={colapsado ? "hidden" : ""}>Ventas</span>
                    </Link>
                </li>
                <li>
                    <Link to="/clientes">
                        <FiUsers /> <span className={colapsado ? "hidden" : ""}>Clientes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/medicamentos">
                        <FiDatabase /> <span className={colapsado ? "hidden" : ""}>Medicamentos</span>
                    </Link>
                </li>

                {usuarioActual?.rol === "admin" && (
                    <>
                        <li>
                            <Link to="/productos">
                                <FiBox /> <span className={colapsado ? "hidden" : ""}>Productos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/proveedores">
                                <FiTruck /> <span className={colapsado ? "hidden" : ""}>Proveedores</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inventario">
                                📦 <span className={colapsado ? "hidden" : ""}>Inventario</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/usuarios">
                                <FiUsers /> <span className={colapsado ? "hidden" : ""}>Usuarios</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            {/* Botón de cambio de tema */}
            <button className="tema-btn" onClick={toggleTema}>
                {temaOscuro ? <FiSun /> : <FiMoon />}{" "}
                {colapsado ? "" : temaOscuro ? "Modo Claro" : "Modo Oscuro"}
            </button>
        </div>
    );
};

export default Sidebar;
