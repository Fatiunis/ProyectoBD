import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import proveedoresData from "../data/proveedores.json";

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [productos, setProductos] = useState("");
    const [editando, setEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const proveedoresGuardados = JSON.parse(localStorage.getItem("proveedores"));
        if (proveedoresGuardados && proveedoresGuardados.length > 0) {
            setProveedores(proveedoresGuardados);
        } else {
            setProveedores(proveedoresData);
            localStorage.setItem("proveedores", JSON.stringify(proveedoresData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("proveedores", JSON.stringify(proveedores));
    }, [proveedores]);

    const agregarProveedor = (e) => {
        e.preventDefault();
        if (!nombre || !telefono || !empresa || !productos) return alert("Todos los campos son obligatorios");

        const nuevoProveedor = { 
            nombre, 
            telefono, 
            empresa, 
            productos: productos.split(",").map(producto => producto.trim()) 
        };

        if (editando !== null) {
            const proveedoresActualizados = proveedores.map((proveedor, index) =>
                index === editando ? nuevoProveedor : proveedor
            );
            setProveedores(proveedoresActualizados);
            setEditando(null);
        } else {
            setProveedores([...proveedores, nuevoProveedor]);
        }

        setNombre("");
        setTelefono("");
        setEmpresa("");
        setProductos("");
    };

    const eliminarProveedor = (index) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este proveedor?")) {
            setProveedores(proveedores.filter((_, i) => i !== index));
        }
    };

    const editarProveedor = (index) => {
        setNombre(proveedores[index].nombre);
        setTelefono(proveedores[index].telefono);
        setEmpresa(proveedores[index].empresa);
        setProductos(proveedores[index].productos.join(", "));
        setEditando(index);
    };

    const proveedoresFiltrados = proveedores.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proveedor.empresa.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Gestión de Proveedores</h2>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar proveedor por nombre o empresa..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <form onSubmit={agregarProveedor} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre del Proveedor</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Empresa</label>
                        <input type="text" className="form-control" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Productos (separados por coma)</label>
                        <input type="text" className="form-control" value={productos} onChange={(e) => setProductos(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {editando !== null ? "Actualizar Proveedor" : "Agregar Proveedor"}
                        </button>
                    </div>
                </form>

                <div className="mt-4">
                    <h3>Lista de Proveedores</h3>
                    {proveedoresFiltrados.length === 0 ? (
                        <p className="alert alert-warning">No se encontraron proveedores.</p>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Empresa</th>
                                    <th>Productos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedoresFiltrados.map((proveedor, index) => (
                                    <tr key={index}>
                                        <td>{proveedor.nombre}</td>
                                        <td>{proveedor.telefono}</td>
                                        <td>{proveedor.empresa}</td>
                                        <td>{proveedor.productos.join(", ")}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => editarProveedor(index)}>✏️ Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarProveedor(index)}>🗑️ Eliminar</button>
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

export default Proveedores;
