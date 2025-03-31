import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";

const Home = () => {
    const [promociones, setPromociones] = useState([]);

    useEffect(() => {
        setPromociones([
            { id: 1, imagen: "/promo1.jpg", titulo: "Descuento en Analgésicos", descripcion: "Aprovecha un 20% de descuento en analgésicos seleccionados." },
            { id: 2, imagen: "/promo2.jpg", titulo: "2x1 en Vitaminas", descripcion: "Compra 2 frascos de vitaminas y paga solo 1." },
        ]);
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="overlay"></div>
                <div className="hero-content text-white">
                    <h1 className="display-3 fw-bold">Tu Salud, Nuestra Prioridad</h1>
                    <p className="lead">Medicamentos y atención de calidad al mejor precio.</p>
                    <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                        <Link to="/medicamentos" className="btn btn-lg btn-light shadow">Explorar Medicamentos</Link>
                        <Link to="/registro" className="btn btn-lg btn-outline-light shadow">Registrarse</Link>
                    </div>
                </div>
            </section>

            {/* Sección de Promociones */}
            <div className="container text-center mt-5">
                <h2 className="section-title">Ofertas Especiales</h2>
                <div id="promocionesCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {promociones.map((promo, index) => (
                            <div key={promo.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <img src={promo.imagen} className="d-block w-100 rounded" alt={promo.titulo} />
                                <div className="carousel-caption bg-dark bg-opacity-50 rounded">
                                    <h5>{promo.titulo}</h5>
                                    <p>{promo.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#promocionesCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#promocionesCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            {/* Servicios Destacados */}
            <div className="container text-center mt-5">
                <h2 className="section-title">Nuestros Servicios</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="service-card">
                            <i className="fas fa-pills fa-3x"></i>
                            <h3>Medicamentos</h3>
                            <p>Contamos con una amplia gama de medicamentos de calidad.</p>
                            <Link to="/medicamentos" className="btn btn-outline-primary">Ver más</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="service-card">
                            <i className="fas fa-hospital fa-3x"></i>
                            <h3>Historia</h3>
                            <p>Más de 30 años brindando bienestar y salud.</p>
                            <Link to="/historia" className="btn btn-outline-primary">Ver más</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="service-card">
                            <i className="fas fa-comments fa-3x"></i>
                            <h3>Preguntas Frecuentes</h3>
                            <p>Encuentra respuestas a tus dudas sobre medicamentos y recetas.</p>
                            <Link to="/faq" className="btn btn-outline-primary">Ver más</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonios */}
            <div className="container mt-5 text-center">
                <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
                <div className="testimonio shadow-lg p-4">
                    <p>💬 "Siempre encuentro los medicamentos que necesito y el servicio es excelente."</p>
                    <strong>- María González</strong>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer text-white text-center py-4 mt-5">
                <p>&copy; 2024 Farmacia+. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
