import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { usuarioActual, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ventas, setVentas] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState("");
    const [productosVendidos, setProductosVendidos] = useState({});
    const [metodosPago, setMetodosPago] = useState({});

    useEffect(() => {
        const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
        setVentas(ventasGuardadas);
        calcularEstadisticas(ventasGuardadas);
    }, []);

    const ventasFiltradas = filtroFecha
        ? ventas.filter((venta) => venta.fecha === filtroFecha)
        : ventas;

    const calcularEstadisticas = (ventasData) => {
        let productosCount = {};
        let metodosCount = {};

        ventasData.forEach((venta) => {
            metodosCount[venta.metodoPago] = (metodosCount[venta.metodoPago] || 0) + 1;

            venta.productos.forEach((producto) => {
                productosCount[producto.nombre] = (productosCount[producto.nombre] || 0) + producto.cantidad;
            });
        });

        setProductosVendidos(productosCount);
        setMetodosPago(metodosCount);
    };

    const productosData = {
        labels: Object.keys(productosVendidos),
        datasets: [
            {
                label: "Cantidad Vendida",
                data: Object.values(productosVendidos),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const metodosPagoData = {
        labels: Object.keys(metodosPago),
        datasets: [
            {
                label: "Cantidad de Ventas",
                data: Object.values(metodosPago),
                backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
            },
        ],
    };

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate("/");
        }, 100);
    };

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Dashboard</h2>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Usuario</div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>{usuarioActual?.usuario}</strong> ({usuarioActual?.rol})
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Total de Ventas</div>
                            <div className="card-body">
                                <p className="card-text">
                                    ${ventasFiltradas.reduce((acc, venta) => acc + venta.total, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Filtrar ventas por fecha:</label>
                    <input type="date" className="form-control" onChange={(e) => setFiltroFecha(e.target.value)} />
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-info text-white">Productos Más Vendidos</div>
                            <div className="card-body">
                                <Bar data={productosData} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-warning text-dark">Uso de Métodos de Pago</div>
                            <div className="card-body">
                                <Pie data={metodosPagoData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
