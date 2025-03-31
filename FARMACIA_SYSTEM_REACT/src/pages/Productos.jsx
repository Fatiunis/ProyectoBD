import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import productosData from "../data/productos.json";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [editando, setEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

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

    const agregarProducto = (e) => {
        e.preventDefault();
        if (!nombre || !precio) return alert("Todos los campos son obligatorios");

        if (editando !== null) {
            const productosActualizados = productos.map((prod, index) =>
                index === editando ? { nombre, precio } : prod
            );
            setProductos(productosActualizados);
            setEditando(null);
        } else {
            setProductos([...productos, { nombre, precio }]);
        }

        setNombre("");
        setPrecio("");
    };

    const eliminarProducto = (index) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            setProductos(productos.filter((_, i) => i !== index));
        }
    };

    const editarProducto = (index) => {
        setNombre(productos[index].nombre);
        setPrecio(productos[index].precio);
        setEditando(index);
    };

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Gestión de Productos</h2>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <form onSubmit={agregarProducto} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre del Producto</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Precio</label>
                        <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {editando !== null ? "Actualizar Producto" : "Agregar Producto"}
                        </button>
                    </div>
                </form>

                <div className="mt-4">
                    <h3>Lista de Productos</h3>
                    {productosFiltrados.length === 0 ? (
                        <p className="alert alert-warning">No se encontraron productos.</p>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre}</td>
                                        <td>${prod.precio}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => editarProducto(index)}>✏️ Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(index)}>🗑️ Eliminar</button>
                                        </td>
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

export default Productos;
