import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PlanPremiumPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-5 flex-grow-1">
        <div className="card shadow p-4">
          <div className="row">
            {/* Imagen representativa */}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img src="/images/plan-premium.jpg" alt="Plan Premium" className="plan-image" />
            </div>



            {/* Contenido del plan */}
            <div className="col-md-8">
              <h2 className="text-danger text-center">Plan Premium - 90% de Cobertura</h2>
              <p className="text-muted text-center">La mejor protección para ti y tu familia con máxima cobertura.</p>

              <h4 className="text-danger">✅ Cobertura:</h4>
              <p>Cubre el <strong>90% de los gastos médicos</strong>.</p>

              <h4 className="text-danger">✅ Servicios Incluidos:</h4>
              <ul>
                <li>Consultas médicas en hospitales afiliados.</li>
                <li>Exámenes de laboratorio cubiertos dentro de hospitales en convenio.</li>
                <li>Cirugías y procedimientos aprobados por la aseguradora.</li>
                <li>Medicamentos adquiridos en farmacias afiliadas.</li>
              </ul>

              <h4 className="text-danger">✅ Condiciones:</h4>
              <ul>
                <li>El afiliado debe estar al día en sus pagos para acceder a los beneficios.</li>
                <li>Solo cubre servicios dentro de hospitales y farmacias con convenio.</li>
              </ul>

              <h4 className="text-danger">✅ Restricciones:</h4>
              <ul>
                <li>Existen ciertos servicios médicos que pueden no estar cubiertos completamente.</li>
                <li>Se requiere una validación automática para la aprobación de medicamentos y procedimientos.</li>
              </ul>

              <div className="text-center mt-4">
                <Link to="/contacto" className="btn btn-danger btn-lg">Contratar Plan Premium</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlanPremiumPage;
