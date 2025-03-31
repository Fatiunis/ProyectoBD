const API_URL = "http://localhost/sistema_adfs/polizas/";

export const obtenerPolizas = async () => {
  const res = await fetch(`${API_URL}obtener.php`);
  const data = await res.json();
  return data;
};




export const insertarPoliza = async (poliza) => {
    const res = await fetch("http://localhost/sistema_adfs/polizas/insertar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(poliza),
    });
  
    const data = await res.json();
    return data;
  };
  

export const actualizarPoliza = async (poliza) => {
  const res = await fetch(`${API_URL}actualizar.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(poliza),
  });
  return await res.json();
};

export const eliminarPoliza = async (id) => {
  const res = await fetch(`${API_URL}eliminar.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};
