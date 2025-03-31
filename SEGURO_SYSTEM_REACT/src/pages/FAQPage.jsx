import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const FAQPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center p-5 bg-danger text-white shadow-sm">
        <h1 className="fw-bold">Preguntas Frecuentes (FAQ)</h1>
        <p className="lead">Encuentra respuestas a las dudas más comunes sobre nuestros servicios.</p>
      </header>

      <div className="container mt-5 flex-grow-1">
        <section className="mb-5">
          <h2 className="text-danger">❓ Preguntas Generales</h2>
          <div className="accordion" id="faqGeneral">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                  📌 ¿Qué es ADFS Seguros y qué servicios ofrece?
                </button>
              </h2>
              <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#faqGeneral">
                <div className="accordion-body">
                  ADFS Seguros es una aseguradora líder en el sector de salud, ofreciendo planes de cobertura médica 
                  para individuos y empresas. Contamos con una amplia red de hospitales y farmacias afiliadas para 
                  garantizar la mejor atención.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                  📌 ¿Cómo puedo afiliarme a ADFS Seguros?
                </button>
              </h2>
              <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faqGeneral">
                <div className="accordion-body">
                  Puedes afiliarte a través de nuestra página web en la sección de <Link to="/contacto">Contacto</Link>, 
                  llamando a nuestra línea de atención o visitando nuestras oficinas. Uno de nuestros asesores te 
                  guiará en el proceso de afiliación y te ayudará a elegir el plan adecuado.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Cobertura */}
        <section className="mb-5">
          <h2 className="text-danger">🛡️ Cobertura y Beneficios</h2>
          <div className="accordion" id="faqCobertura">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                  ✅ ¿Qué tipo de servicios médicos están cubiertos?
                </button>
              </h2>
              <div id="q3" className="accordion-collapse collapse" data-bs-parent="#faqCobertura">
                <div className="accordion-body">
                  Nuestros planes incluyen cobertura para consultas médicas, hospitalización, exámenes de laboratorio, 
                  medicamentos y cirugías. La cobertura específica depende del plan contratado.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                  ✅ ¿Puedo atenderme en cualquier hospital?
                </button>
              </h2>
              <div id="q4" className="accordion-collapse collapse" data-bs-parent="#faqCobertura">
                <div className="accordion-body">
                  Puedes atenderte en cualquier hospital afiliado a nuestra red. Para verificar los hospitales disponibles, 
                  consulta nuestra lista en la página de <Link to="/contacto">Atención al Cliente</Link>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Pagos y Reembolsos */}
        <section className="mb-5">
          <h2 className="text-danger">💳 Pagos y Reembolsos</h2>
          <div className="accordion" id="faqPagos">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
                  💰 ¿Cómo puedo pagar mi póliza?
                </button>
              </h2>
              <div id="q5" className="accordion-collapse collapse" data-bs-parent="#faqPagos">
                <div className="accordion-body">
                  Puedes realizar tus pagos mediante débito automático, transferencia bancaria, tarjeta de crédito o 
                  en nuestras oficinas físicas. También ofrecemos opciones de pago en línea a través de nuestro portal.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
                  💰 ¿Cómo solicito un reembolso?
                </button>
              </h2>
              <div id="q6" className="accordion-collapse collapse" data-bs-parent="#faqPagos">
                <div className="accordion-body">
                  Para solicitar un reembolso, debes enviar una solicitud a través de nuestro portal junto con los 
                  documentos requeridos, como facturas y justificantes médicos. El proceso de aprobación puede tomar 
                  entre 5 y 10 días hábiles.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Contacto para Más Preguntas */}
        <section className="text-center bg-light p-5">
          <h2>📞 ¿Aún tienes dudas?</h2>
          <p className="text-muted">Si no encontraste la respuesta que buscabas, ponte en contacto con nuestro equipo de atención al cliente.</p>
          <Link to="/contacto" className="btn btn-danger btn-lg">Contactar a un Asesor</Link>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
