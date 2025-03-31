import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3">
      <div className="container">
        {/* Logo o Nombre de la aseguradora */}
        <Link to="/" className="navbar-brand fw-bold">
          <i className="fas fa-shield-alt"></i> ADFS Seguros
        </Link>

        {/* Botón para menú en móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Elementos de navegación */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link"><i className="fas fa-home"></i> Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/historia" className="nav-link"><i className="fas fa-book"></i> Nuestra Historia</Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link"><i className="fas fa-question-circle"></i> FAQ</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link"><i className="fas fa-phone"></i> Contacto</Link>
            </li>

            {/* Dropdown de Planes con mejor diseño */}
            <li
              className="nav-item dropdown position-relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="nav-link dropdown-toggle">
                <i className="fas fa-file-alt"></i> Planes
              </span>
              {dropdownOpen && (
                <ul className="dropdown-menu show custom-dropdown">
                  <li><Link to="/plan-basico" className="dropdown-item">Básico</Link></li>
                  <li><Link to="/plan-premium" className="dropdown-item">Premium</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Botón de iniciar sesión */}
        <Link to="/login" className="btn btn-outline-light">
          <i className="fas fa-user"></i> Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
