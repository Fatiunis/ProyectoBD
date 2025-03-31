const defaultPages = [
    { path: "/", name: "Home", enabled: true },
    { path: "/login", name: "Inicio de Sesión", enabled: true },
    { path: "/historia", name: "Historia de la Institución", enabled: true },
    { path: "/faq", name: "FAQ", enabled: true },
    { path: "/contacto", name: "Contacto", enabled: true },
    { path: "/medicamentos", name: "Medicamentos", enabled: true },
    { path: "/promociones", name: "Promociones", enabled: true },
];

// Obtener las páginas desde localStorage o usar las predeterminadas
const savedPages = JSON.parse(localStorage.getItem("pagesData")) || defaultPages;
export default savedPages;
