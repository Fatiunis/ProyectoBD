import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Sección Hero */}
      <header className="text-center p-5 bg-danger text-white">
        <h1 className="display-4 fw-bold">Bienvenido a ADFS Seguros</h1>
        <p className="lead">Protegiendo lo que más importa, con planes a la medida de tus necesidades.</p>
        <Link to="/contacto" className="btn btn-light btn-lg mt-3">Solicita Información</Link>
      </header>

      {/* Sección de Beneficios */}
      <section className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="fas fa-user-shield fa-3x text-danger mb-3"></i>
            <h3>Seguridad Garantizada</h3>
            <p>Más de 20 años ofreciendo seguros de salud y vida con respaldo sólido.</p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-hand-holding-medical fa-3x text-danger mb-3"></i>
            <h3>Atención Inmediata</h3>
            <p>Accede a nuestra red de hospitales y clínicas con solo presentar tu póliza digital.</p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-headset fa-3x text-danger mb-3"></i>
            <h3>Asistencia 24/7</h3>
            <p>Nuestro equipo de atención al cliente está disponible en todo momento para ayudarte.</p>
          </div>
        </div>
      </section>

      {/* Sección de Planes */}
      <section className="container mt-5">
        <h2 className="text-center">Nuestros Planes de Seguro</h2>
        <p className="text-center text-muted">Elige el plan que mejor se adapte a ti y a tu familia.</p>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow text-center">
              <div className="card-body">
                <h4 className="card-title text-danger">Plan Básico</h4>
                <p className="card-text">Cobertura médica esencial con acceso a clínicas privadas.</p>
                <Link to="/plan-basico" className="btn btn-outline-danger">Más Información</Link>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card shadow text-center">
              <div className="card-body">
                <h4 className="card-title text-danger">Plan Premium</h4>
                <p className="card-text">Cobertura total con hospitalización privada y tratamientos avanzados.</p>
                <Link to="/plan-premium" className="btn btn-outline-danger">Más Información</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Llamado a la Acción */}
      <section className="text-center bg-light p-5 mt-5">
        <h2>¿Listo para asegurar tu bienestar?</h2>
        <p className="text-muted">Ponte en contacto con nosotros y recibe asesoría gratuita.</p>
        <Link to="/contacto" className="btn btn-danger btn-lg">Contactar a un Asesor</Link>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
