import React, { useState, useEffect } from "react";
import pagesData from "../data/pagesData";

const AdminPages = () => {
    const [pages, setPages] = useState(() => {
        const savedPages = localStorage.getItem("pagesData");
        return savedPages ? JSON.parse(savedPages) : pagesData;
    });

    const [newPage, setNewPage] = useState({ name: "", path: "", enabled: true });

    useEffect(() => {
        localStorage.setItem("pagesData", JSON.stringify(pages));
    }, [pages]);

    const agregarPagina = () => {
        if (!newPage.name || !newPage.path) return alert("Todos los campos son obligatorios.");
        
        setPages([...pages, newPage]);
        setNewPage({ name: "", path: "", enabled: true });
    };

    const togglePagina = (index) => {
        const updatedPages = [...pages];
        updatedPages[index].enabled = !updatedPages[index].enabled;
        setPages(updatedPages);
    };

    const eliminarPagina = (index) => {
        if (window.confirm("¿Seguro que deseas eliminar esta página?")) {
            setPages(pages.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Administrar Páginas</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre de la Página"
                    value={newPage.name}
                    onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ruta (Ejemplo: /nueva-pagina)"
                    value={newPage.path}
                    onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
                />
                <button className="btn btn-success w-100" onClick={agregarPagina}>Agregar Página</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ruta</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page, index) => (
                        <tr key={index}>
                            <td>{page.name}</td>
                            <td>{page.path}</td>
                            <td>{page.enabled ? "Activa" : "Deshabilitada"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => togglePagina(index)}>
                                    {page.enabled ? "Deshabilitar" : "Habilitar"}
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarPagina(index)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPages;
