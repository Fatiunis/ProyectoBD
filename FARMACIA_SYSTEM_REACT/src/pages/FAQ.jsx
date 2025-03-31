import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FAQ.css";

const FAQ = () => {
  return (
    <div className="container" style={{ marginTop: "8rem", paddingTop: "3rem" }}>
      <h1 className="titulo text-center">Preguntas Frecuentes</h1>
      <p className="subtitulo text-center">
        Aquí resolvemos las dudas más comunes de nuestros clientes.
      </p>

      {/* Acordeón */}
      <div className="accordion mt-4" id="faqAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#faq1">
              📦 ¿Hacen envíos a domicilio?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Sí, ofrecemos envíos a domicilio en un radio de 10 km desde nuestras sucursales.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq2">
              💊 ¿Necesito receta para comprar medicamentos?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Solo en medicamentos controlados. En el resto de productos, no es necesario.
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="mt-5 text-center">
        <h3>¿Tienes otra duda?</h3>
        <p>Déjanos tu pregunta y te responderemos pronto.</p>
        <form>
          <input type="text" className="form-control w-50 mx-auto" placeholder="Escribe tu pregunta..." />
          <button className="btn btn-primary mt-3">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
