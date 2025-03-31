import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Historia.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Historia = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container" style={{ marginTop: "8rem", paddingTop: "3rem" }}>
      {/* Introducción con fondo mejorado */}
      <div className="historia-header text-center">
        <h1 className="titulo">Nuestra Historia</h1>
        <p className="subtitulo">
          Más de 30 años cuidando la salud de nuestra comunidad. Desde nuestros humildes inicios hasta la innovación actual.
        </p>
      </div>

      {/* Imagen de portada con efecto */}
      <div className="historia-banner">
        <img src="/historia-banner.jpg" alt="Nuestra Historia" className="img-fluid rounded shadow-lg" data-aos="fade-up"/>
      </div>

      {/* Sección de historia con fondo y mejor diseño */}
      <div className="historia-detallada mt-5" data-aos="fade-right">
        <h2 className="text-center">Compromiso con la Salud y Bienestar</h2>
        <p>
          Lo que comenzó como un pequeño negocio familiar en 1990, se ha convertido en una red de farmacias con presencia en 
          múltiples ciudades. Nos hemos mantenido a la vanguardia, ofreciendo soluciones de salud accesibles e innovadoras.
        </p>
      </div>

      {/* Línea del Tiempo Rediseñada */}
      <div className="timeline-container mt-5">
        <h2 className="text-center">Nuestra Evolución</h2>
        <div className="timeline">
          <div className="timeline-item" data-aos="fade-left">
            <h3>🛠️ 1990 - Fundación</h3>
            <p>Inauguramos nuestra primera sucursal, con un enfoque en salud accesible.</p>
          </div>
          <div className="timeline-item" data-aos="fade-right">
            <h3>🏥 2005 - Expansión</h3>
            <p>Crece nuestra red de farmacias con 5 nuevas sucursales estratégicas.</p>
          </div>
          <div className="timeline-item" data-aos="fade-left">
            <h3>💻 2015 - Digitalización</h3>
            <p>Modernizamos nuestros servicios con compras en línea y asesoramiento virtual.</p>
          </div>
          <div className="timeline-item" data-aos="fade-right">
            <h3>🚀 2024 - Innovación</h3>
            <p>Implementamos inteligencia artificial para mejorar la atención médica.</p>
          </div>
        </div>
      </div>

      {/* Sección de Imágenes con Efecto Moderno */}
      <div className="row mt-5">
        <div className="col-md-4" data-aos="zoom-in">
          <div className="historia-card">
            <img src="/farmacia-antigua.jpg" alt="Farmacia en 1990" className="img-fluid"/>
            <p className="text-center mt-2">Nuestra primera farmacia en 1990</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="zoom-in">
          <div className="historia-card">
            <img src="/farmacia-moderna.jpg" alt="Expansión en 2005" className="img-fluid"/>
            <p className="text-center mt-2">Expansión con más sucursales</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="zoom-in">
          <div className="historia-card">
            <img src="/servicio-online.jpg" alt="Farmacia digital 2024" className="img-fluid"/>
            <p className="text-center mt-2">Atención en línea en 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historia;
