import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import productosData from "../data/productos.json";

const Inventario = () => {
    const [productos, setProductos] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: "",
        nombre: "",
        principioActivo: "",
        concentracion: "",
        presentacion: "",
        categoria: "",
        marca: "",
        precio: "",
        stock: "",
        requiereReceta: false
    });

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("productos"));
        if (productosGuardados && productosGuardados.length > 0) {
            setProductos(productosGuardados);
        } else {
            setProductos(productosData);
            localStorage.setItem("productos", JSON.stringify(productosData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(productos));
    }, [productos]);

    const abrirModal = () => {
        setNuevoProducto({
            codigo: "",
            nombre: "",
            principioActivo: "",
            concentracion: "",
            presentacion: "",
            categoria: "",
            marca: "",
            precio: "",
            stock: "",
            requiereReceta: false
        });
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setNuevoProducto({
            ...nuevoProducto,
            [name]: type === "checkbox" ? checked : 
                    name === "precio" || name === "stock" ? Number(value) : value
        });
    };

    const agregarProducto = () => {
        if (!nuevoProducto.codigo || !nuevoProducto.nombre || isNaN(nuevoProducto.precio) || isNaN(nuevoProducto.stock)) {
            alert("Todos los campos son obligatorios y deben ser válidos.");
            return;
        }

        setProductos([...productos, { 
            ...nuevoProducto, 
            precio: Number(nuevoProducto.precio), 
            stock: Number(nuevoProducto.stock) 
        }]);
        cerrarModal();
    };

    const actualizarStock = (codigo, nuevoStock) => {
        const nuevosProductos = productos.map((prod) =>
            prod.codigo === codigo ? { ...prod, stock: Number(nuevoStock) } : prod
        );
        setProductos(nuevosProductos);
    };

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="mb-4">📦 Gestión de Inventario</h2>
                <button className="btn btn-primary mb-3" onClick={abrirModal}>
                    ➕ Agregar Nuevo Producto
                </button>

                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Principio Activo</th>
                            <th>Concentración</th>
                            <th>Presentación</th>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Receta</th>
                            <th>Actualizar Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index} className={producto.stock < 5 ? "table-danger" : ""}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.principioActivo}</td>
                                <td>{producto.concentracion}</td>
                                <td>{producto.presentacion}</td>
                                <td>{producto.categoria}</td>
                                <td>{producto.marca}</td>
                                <td>${Number(producto.precio).toFixed(2)}</td>
                                <td>{producto.stock}</td>
                                <td>{producto.requiereReceta ? "Sí" : "No"}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        value={producto.stock}
                                        onChange={(e) => actualizarStock(producto.codigo, Number(e.target.value))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para agregar productos */}
                {modalAbierto && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar Producto</h5>
                                    <button type="button" className="btn-close" onClick={cerrarModal}></button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control mb-2" name="codigo" placeholder="Código" value={nuevoProducto.codigo} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="principioActivo" placeholder="Principio Activo" value={nuevoProducto.principioActivo} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="concentracion" placeholder="Concentración" value={nuevoProducto.concentracion} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="presentacion" placeholder="Presentación" value={nuevoProducto.presentacion} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="categoria" placeholder="Categoría" value={nuevoProducto.categoria} onChange={manejarCambio} />
                                    <input type="text" className="form-control mb-2" name="marca" placeholder="Marca" value={nuevoProducto.marca} onChange={manejarCambio} />
                                    <input type="number" className="form-control mb-2" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={manejarCambio} />
                                    <input type="number" className="form-control mb-2" name="stock" placeholder="Stock" value={nuevoProducto.stock} onChange={manejarCambio} />
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" name="requiereReceta" checked={nuevoProducto.requiereReceta} onChange={manejarCambio} />
                                        <label className="form-check-label">Requiere Receta Médica</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" onClick={agregarProducto}>Guardar</button>
                                    <button className="btn btn-danger" onClick={cerrarModal}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventario;
