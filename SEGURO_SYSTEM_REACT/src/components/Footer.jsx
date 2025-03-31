import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Sección 1: Información de la empresa */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="text-uppercase">Aseguradora XYZ</h5>
            <p>Protegiendo tu futuro con los mejores servicios de salud y seguros.</p>
            <p>© 2024 Aseguradora XYZ. Todos los derechos reservados.</p>
          </div>

          {/* Sección 2: Enlaces rápidos */}
          <div className="col-md-4 text-center">
            <h5 className="text-uppercase">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><Link to="/historia" className="text-white">Nuestra Historia</Link></li>
              <li><Link to="/faq" className="text-white">Preguntas Frecuentes</Link></li>
              <li><Link to="/contacto" className="text-white">Contáctanos</Link></li>
              <li><Link to="/login" className="text-white">Iniciar Sesión</Link></li>
            </ul>
          </div>

          {/* Sección 3: Redes Sociales */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="text-uppercase">Síguenos</h5>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light m-1">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light m-1">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light m-1">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-3 border-light" />

        {/* Sección 4: Contacto y Legal */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p>📞 Teléfono: +502 1234-5678 | 📧 Email: contacto@aseguradoraxyz.com</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/politica-privacidad" className="text-white me-3">Política de Privacidad</Link>
            <Link to="/terminos-condiciones" className="text-white">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
