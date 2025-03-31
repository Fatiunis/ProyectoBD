import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HistoriaPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center p-5 bg-danger text-white shadow-sm">
        <h1 className="fw-bold">Nuestra Historia</h1>
        <p className="lead">Más de 20 años protegiendo el bienestar y la tranquilidad de nuestros asegurados.</p>
      </header>

      <div className="container mt-5 flex-grow-1">
        {/* Sección de Historia */}
        <section className="mb-5">
          <h2 className="text-danger">📜 Historia de ADFS Seguros</h2>
          <p>
            ADFS Seguros nació en el año 2000 con un propósito claro: brindar seguridad y tranquilidad a las familias mediante 
            seguros médicos accesibles y confiables. Con más de dos décadas de experiencia, nos hemos consolidado como 
            una de las aseguradoras líderes en el país, con una amplia red de hospitales y farmacias afiliadas.
          </p>
          <p>
            A lo largo de los años, hemos innovado constantemente para ofrecer planes de salud personalizados que se 
            ajusten a las necesidades de nuestros clientes, garantizando un servicio de calidad y una atención médica oportuna.
          </p>
        </section>

        {/* Acordeón para Misión, Visión y Compromiso */}
        <section className="mb-5">
          <h2 className="text-danger">🎯 Nuestra Filosofía</h2>
          <div className="accordion" id="filosofiaAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#mision">
                  🎯 Nuestra Misión
                </button>
              </h2>
              <div id="mision" className="accordion-collapse collapse show" data-bs-parent="#filosofiaAccordion">
                <div className="accordion-body text-center">
                  <p>
                    Proteger la salud y el bienestar de nuestros asegurados mediante servicios de seguros innovadores, accesibles y confiables.
                    Nos esforzamos en proporcionar coberturas médicas que brinden tranquilidad y seguridad a cada uno de nuestros clientes.
                  </p>
                  <img src="/images/mision.jpg" alt="Misión" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "300px" }} />
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vision">
                  🔮 Nuestra Visión
                </button>
              </h2>
              <div id="vision" className="accordion-collapse collapse" data-bs-parent="#filosofiaAccordion">
                <div className="accordion-body text-center">
                  <p>
                    Ser la aseguradora líder en el sector de salud, reconocida por la calidad de nuestros servicios, la excelencia en la atención al cliente y la innovación en nuestros planes de cobertura.
                  </p>
                  <img src="/images/vision.jpg" alt="Visión" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "300px" }} />
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#compromiso">
                  🤝 Nuestro Compromiso
                </button>
              </h2>
              <div id="compromiso" className="accordion-collapse collapse" data-bs-parent="#filosofiaAccordion">
                <div className="accordion-body text-center">
                  <p>
                    En ADFS Seguros, cada asegurado es nuestra prioridad. Nos comprometemos a ofrecer atención médica accesible, cobertura confiable y un servicio al cliente excepcional.
                  </p>
                  <img src="/images/compromiso.jpg" alt="Compromiso" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "300px" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel de Valores Corporativos */}
        <section className="mb-5">
          <h2 className="text-danger text-center">🏆 Nuestros Valores</h2>
          <div id="valoresCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active text-center">
                <h4 className="text-danger">🔹 Compromiso</h4>
                <p>Nos dedicamos a ofrecer un servicio excepcional, con enfoque en la salud y bienestar de nuestros asegurados.</p>
                <img src="/images/compromiso-valor.jpg" alt="Compromiso" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "400px", height: "250px", objectFit: "cover" }} />
              </div>
              <div className="carousel-item text-center">
                <h4 className="text-danger">🔹 Confianza</h4>
                <p>Construimos relaciones sólidas basadas en la honestidad, transparencia y responsabilidad.</p>
                <img src="/images/confianza-valor.jpg" alt="Confianza" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "400px", height: "250px", objectFit: "cover" }} />
              </div>
              <div className="carousel-item text-center">
                <h4 className="text-danger">🔹 Innovación</h4>
                <p>Buscamos constantemente nuevas soluciones para mejorar nuestros servicios y la experiencia de nuestros clientes.</p>
                <img src="/images/innovacion-valor.jpg" alt="Innovación" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "400px", height: "250px", objectFit: "cover" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#valoresCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#valoresCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HistoriaPage;
