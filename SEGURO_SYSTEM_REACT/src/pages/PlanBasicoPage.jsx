import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PlanBasicoPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-5 flex-grow-1">
        <div className="card shadow p-4">
          <div className="row">
            {/* Imagen representativa */}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img src="/images/plan-basico.jpg" alt="Plan Básico" className="plan-image" />
            </div>



            {/* Contenido del plan */}
            <div className="col-md-8">
              <h2 className="text-danger text-center">Plan Básico - 70% de Cobertura</h2>
              <p className="text-muted text-center">Una opción accesible con los beneficios esenciales para tu salud.</p>

              <h4 className="text-danger">✅ Cobertura:</h4>
              <p>Cubre el <strong>70% de los gastos médicos</strong>.</p>

              <h4 className="text-danger">✅ Servicios Incluidos:</h4>
              <ul>
                <li>Consultas médicas con descuento en hospitales en convenio.</li>
                <li>Exámenes de laboratorio cubiertos parcialmente.</li>
                <li>Medicamentos con descuento en farmacias afiliadas.</li>
              </ul>

              <h4 className="text-danger">✅ Condiciones:</h4>
              <ul>
                <li>Debe estar al día en sus pagos para acceder a la cobertura.</li>
                <li>Los hospitales y farmacias deben estar dentro de la red de convenios.</li>
              </ul>

              <h4 className="text-danger">✅ Restricciones:</h4>
              <ul>
                <li>La cobertura es menor en comparación con el Plan Premium.</li>
                <li>Al igual que el plan premium, ciertos servicios pueden no estar totalmente cubiertos y requieren autorización previa.</li>
              </ul>

              <div className="text-center mt-4">
                <Link to="/contacto" className="btn btn-danger btn-lg">Contratar Plan Básico</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlanBasicoPage;
