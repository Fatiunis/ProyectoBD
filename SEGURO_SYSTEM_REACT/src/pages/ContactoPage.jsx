import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactoPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center p-5 bg-danger text-white shadow-sm">
        <h1 className="fw-bold">Contáctanos</h1>
        <p className="lead">Estamos aquí para ayudarte. Comunícate con nosotros a través de cualquiera de nuestros canales.</p>
      </header>

      <div className="container mt-5 flex-grow-1">
        <div className="row">
          {/* Información de Contacto */}
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2 className="text-danger">📞 Información de Contacto</h2>
              <p><strong>📍 Dirección:</strong> Calle Principal #123, Ciudad ADFS</p>
              <p><strong>📞 Teléfono:</strong> +502 1234-5678</p>
              <p><strong>📧 Email:</strong> contacto@adfsseguros.com</p>
              <p><strong>🕒 Horario de Atención:</strong> 24/7 </p>
            </div>
          </div>

          {/* Imagen Representativa */}
          <div className="col-md-6 text-center">
            <img src="/images/contacto.jpg" alt="Atención al Cliente" className="img-fluid rounded shadow" style={{ maxWidth: "400px", height: "300px", objectFit: "cover" }} />
          </div>
        </div>

        {/* Formulario de Contacto */}
        <section className="mt-5">
          <h2 className="text-danger text-center">📩 Envíanos un Mensaje</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="shadow p-4 rounded">
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className="form-control" placeholder="Tu nombre" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" placeholder="tuemail@ejemplo.com" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-danger btn-lg">Enviar Mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Mapa (Opcional) */}
        <section className="mt-5 text-center">
          <h2 className="text-danger">🌍 Nuestra Ubicación</h2>
          <iframe
            title="Mapa de Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991418426!2d-74.25986410997892!3d40.69767006328857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAlMDQxJzUyLjYiTiA3NMKwMTUnMDcuMiJX!5e0!3m2!1ses-419!2sus!4v1635429058316!5m2!1ses-419!2sus"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="shadow rounded">
          </iframe>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactoPage;
