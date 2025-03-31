import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contacto.css";

const Contacto = () => {
  return (
    <div className="container" style={{ marginTop: "8rem", paddingTop: "3rem" }}>
      <h1 className="titulo text-center">Contáctanos</h1>
      <p className="subtitulo text-center">Estamos aquí para ayudarte. Déjanos tu mensaje.</p>

      <div className="row mt-4">
        {/* Formulario */}
        <div className="col-md-6">
          <form className="contacto-form">
            <input type="text" className="form-control" placeholder="Nombre" required />
            <input type="email" className="form-control mt-3" placeholder="Correo Electrónico" required />
            <textarea className="form-control mt-3" rows="4" placeholder="Mensaje" required></textarea>
            <button className="btn btn-primary mt-3 w-100">Enviar</button>
          </form>
        </div>

        {/* Información */}
        <div className="col-md-6 text-center">
          <h3>Nuestra Ubicación</h3>
          <iframe
            className="mt-3"
            src="https://maps.google.com/maps?q=Guatemala&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
