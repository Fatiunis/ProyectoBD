import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import productosData from "../data/productos.json";
import FacturaPDF from "../components/FacturaPDF";

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [cliente, setCliente] = useState({
        nombre: "",
        dpi: "",
        direccion: "",
        telefono: ""
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [metodoPago, setMetodoPago] = useState("Efectivo");
    const [codigoReceta, setCodigoReceta] = useState("");

    useEffect(() => {
        const ventasGuardadas = JSON.parse(localStorage.getItem("ventas"));
        if (ventasGuardadas) {
            setVentas(ventasGuardadas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("ventas", JSON.stringify(ventas));
    }, [ventas]);

    const agregarProducto = (nombre) => {
        const producto = productosData.find((p) => p.nombre === nombre);
        if (!producto) return alert("Producto no encontrado");

        // Validar stock disponible
        if (producto.stock <= 0) {
            return alert(`El producto "${producto.nombre}" está agotado.`);
        }

        // Validar si necesita receta
        if (producto.requiereReceta && !codigoReceta) {
            return alert(`El producto "${producto.nombre}" requiere receta médica.`);
        }

        setProductosSeleccionados([
            ...productosSeleccionados,
            { ...producto, cantidad: 1 }
        ]);
    };

    const actualizarCantidad = (index, cantidad) => {
        if (cantidad < 1 || cantidad > productosSeleccionados[index].stock) {
            return alert(`Cantidad inválida o excede el stock disponible.`);
        }

        const nuevosProductos = [...productosSeleccionados];
        nuevosProductos[index].cantidad = cantidad;
        setProductosSeleccionados(nuevosProductos);
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = productosSeleccionados.filter((_, i) => i !== index);
        setProductosSeleccionados(nuevosProductos);
    };

    const calcularTotal = () => {
        return productosSeleccionados.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    };

    const agregarVenta = (e) => {
        e.preventDefault();
        if (!cliente.nombre || !cliente.dpi || !cliente.direccion || !cliente.telefono) {
            return alert("Todos los datos del cliente son obligatorios.");
        }

        if (productosSeleccionados.length === 0) {
            return alert("Debe seleccionar al menos un producto.");
        }

        const total = calcularTotal();

        // ✅ ACTUALIZACIÓN DE STOCK EN localStorage
        let productosActuales = JSON.parse(localStorage.getItem("productos")) || productosData;

        productosSeleccionados.forEach((producto) => {
            const index = productosActuales.findIndex((p) => p.nombre === producto.nombre);
            if (index !== -1) {
                productosActuales[index].stock -= producto.cantidad;
            }
        });

        localStorage.setItem("productos", JSON.stringify(productosActuales));

        const nuevaVenta = {
            id: ventas.length + 1,
            cliente,
            productos: productosSeleccionados,
            total,
            metodoPago,
            fecha: new Date().toLocaleDateString(),
            codigoReceta: codigoReceta || "N/A"
        };

        setVentas([...ventas, nuevaVenta]);
        setCliente({ nombre: "", dpi: "", direccion: "", telefono: "" });
        setProductosSeleccionados([]);
        setMetodoPago("Efectivo");
        setCodigoReceta("");
    };

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Gestión de Ventas</h2>

                <form onSubmit={agregarVenta} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre del Cliente</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cliente.nombre}
                            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">DPI/NIT</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cliente.dpi}
                            onChange={(e) => setCliente({ ...cliente, dpi: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cliente.direccion}
                            onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cliente.telefono}
                            onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Selecciona un Producto</label>
                        <select
                            className="form-select"
                            onChange={(e) => agregarProducto(e.target.value)}
                        >
                            <option value="">Selecciona un Producto</option>
                            {productosData.map((prod, index) => (
                                <option key={index} value={prod.nombre}>
                                    {prod.nombre} - ${prod.precio} ({prod.stock} en stock)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Código de Receta (si aplica)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={codigoReceta}
                            onChange={(e) => setCodigoReceta(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <p><strong>Total: ${calcularTotal()}</strong></p>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Método de Pago</label>
                        <select
                            className="form-select"
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                        >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Registrar Venta
                        </button>
                    </div>
                </form>

                <div className="mt-4">
                    <h3>Productos Seleccionados</h3>
                    {productosSeleccionados.length === 0 ? (
                        <p className="alert alert-warning">No se han seleccionado productos.</p>
                    ) : (
                        <div className="productos-seleccionados">
                            {productosSeleccionados.map((prod, index) => (
                                <div key={index} className="producto-card">
                                    <p>{prod.nombre}</p>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={prod.cantidad}
                                        onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
                                    />
                                    <p><strong>${prod.precio * prod.cantidad}</strong></p>
                                    <button className="btn btn-danger" onClick={() => eliminarProducto(index)}>
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <h3>Ventas Registradas</h3>
                    {ventas.length === 0 ? (
                        <p className="alert alert-warning">No hay ventas registradas.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Productos</th>
                                    <th>Total</th>
                                    <th>Método de Pago</th>
                                    <th>Factura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map((venta, index) => (
                                    <tr key={index}>
                                        <td>{venta.fecha}</td>
                                        <td>{venta.cliente.nombre}</td>
                                        <td>{venta.productos.map((p, i) => <p key={i}>{p.nombre} x{p.cantidad}</p>)}</td>
                                        <td>${venta.total.toFixed(2)}</td>
                                        <td>{venta.metodoPago}</td>
                                        <td><FacturaPDF venta={venta} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ventas;
