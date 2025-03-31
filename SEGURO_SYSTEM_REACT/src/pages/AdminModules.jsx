import React, { useState, useEffect } from "react";

const defaultModules = [
  { name: "Gestión de Pólizas", key: "polizas", enabled: true },
  { name: "Validación de Cobertura", key: "cobertura", enabled: true },
  { name: "Historial Médico", key: "historial", enabled: true },
  { name: "Reportes y Estadísticas", key: "reportes", enabled: true },
  { name: "Seguridad y Auditoría", key: "seguridad", enabled: true }
];

const AdminModules = () => {
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem("adminModules");
    return saved ? JSON.parse(saved) : defaultModules;
  });

  useEffect(() => {
    localStorage.setItem("adminModules", JSON.stringify(modules));
  }, [modules]);

  const toggleModule = (index) => {
    const updated = [...modules];
    updated[index].enabled = !updated[index].enabled;
    setModules(updated);
  };

  const eliminarModulo = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar este módulo?")) {
      setModules(modules.filter((_, i) => i !== index));
    }
  };

  const [nuevo, setNuevo] = useState({ name: "", key: "", enabled: true });

  const agregarModulo = () => {
    if (!nuevo.name || !nuevo.key) return alert("Todos los campos son obligatorios.");
    setModules([...modules, nuevo]);
    setNuevo({ name: "", key: "", enabled: true });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger">Administrar Módulos del Sistema</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre del Módulo"
          value={nuevo.name}
          onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Clave interna (ej. 'cobertura')"
          value={nuevo.key}
          onChange={(e) => setNuevo({ ...nuevo, key: e.target.value })}
        />
        <button className="btn btn-success w-100" onClick={agregarModulo}>
          Agregar Módulo
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Clave</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod, index) => (
            <tr key={index}>
              <td>{mod.name}</td>
              <td>{mod.key}</td>
              <td>{mod.enabled ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => toggleModule(index)}
                >
                  {mod.enabled ? "Desactivar" : "Activar"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarModulo(index)}
                >
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

export default AdminModules;
