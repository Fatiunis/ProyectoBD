import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import clientesData from "../data/clientes.json";
import ventasData from "../data/ventas.json";

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [editando, setEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [historialCliente, setHistorialCliente] = useState(null);

    useEffect(() => {
        const clientesGuardados = JSON.parse(localStorage.getItem("clientes"));
        if (clientesGuardados && clientesGuardados.length > 0) {
            setClientes(clientesGuardados);
        } else {
            setClientes(clientesData);
            localStorage.setItem("clientes", JSON.stringify(clientesData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }, [clientes]);

    const agregarCliente = (e) => {
        e.preventDefault();
        if (!nombre || !telefono || !direccion) return alert("Todos los campos son obligatorios");

        const nuevoCliente = { nombre, telefono, direccion, historial: [] };

        if (editando !== null) {
            const clientesActualizados = clientes.map((cliente, index) =>
                index === editando ? nuevoCliente : cliente
            );
            setClientes(clientesActualizados);
            setEditando(null);
        } else {
            setClientes([...clientes, nuevoCliente]);
        }

        setNombre("");
        setTelefono("");
        setDireccion("");
    };

    const eliminarCliente = (index) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
            setClientes(clientes.filter((_, i) => i !== index));
        }
    };

    const editarCliente = (index) => {
        setNombre(clientes[index].nombre);
        setTelefono(clientes[index].telefono);
        setDireccion(clientes[index].direccion);
        setEditando(index);
    };

    const verHistorial = (nombreCliente) => {
        const historial = ventasData.filter(venta => venta.cliente === nombreCliente);
        setHistorialCliente({ nombre: nombreCliente, compras: historial });
    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.telefono.includes(busqueda)
    );

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Gestión de Clientes</h2>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar cliente por nombre o teléfono..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <form onSubmit={agregarCliente} className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Nombre del Cliente</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {editando !== null ? "Actualizar Cliente" : "Agregar Cliente"}
                        </button>
                    </div>
                </form>

                <div className="mt-4">
                    <h3>Lista de Clientes</h3>
                    {clientesFiltrados.length === 0 ? (
                        <p className="alert alert-warning">No se encontraron clientes.</p>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.map((cliente, index) => (
                                    <tr key={index}>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => editarCliente(index)}>✏️ Editar</button>
                                            <button className="btn btn-danger btn-sm me-2" onClick={() => eliminarCliente(index)}>🗑️ Eliminar</button>
                                            <button className="btn btn-info btn-sm" onClick={() => verHistorial(cliente.nombre)}>📜 Historial</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {historialCliente && (
                    <div className="card mt-4">
                        <div className="card-header bg-info text-white">
                            <h3>Historial de Compras de {historialCliente.nombre}</h3>
                        </div>
                        <div className="card-body">
                            {historialCliente.compras.length === 0 ? (
                                <p className="alert alert-warning">No hay compras registradas para este cliente.</p>
                            ) : (
                                <ul className="list-group">
                                    {historialCliente.compras.map((venta, index) => (
                                        <li key={index} className="list-group-item">
                                            {venta.fecha} - {venta.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", ")} - Total: ${venta.total}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button className="btn btn-secondary mt-3" onClick={() => setHistorialCliente(null)}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clientes;
