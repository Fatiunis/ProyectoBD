import React from "react";
import { useLocation } from "react-router-dom";  
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Para verificar sesión
import AppRoutes from "./routes";
import TempNavbar from "./components/TempNavbar";
import NavbarInterno from "./components/NavbarInterno"; 
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const location = useLocation();
    const { usuarioActual } = useContext(AuthContext); // Verificar usuario logueado

    // Rutas donde debe aparecer TempNavbar
    const rutasPortalGeneral = ["/", "/medicamentos", "/historia", "/faq", "/contacto", "/login"];
    
    // Rutas privadas donde NO debe aparecer TempNavbar
    const isRutaPrivada = ["/dashboard", "/ventas", "/clientes", "/productos", "/proveedores"].includes(location.pathname);

    return (
        <div className="container-fluid">
            {/* Muestra TempNavbar en todas las rutas del portal general */}
            {rutasPortalGeneral.includes(location.pathname) && <TempNavbar />}
            
            {/* Muestra NavbarInterno solo si el usuario está logueado y es una ruta privada */}
            {usuarioActual && isRutaPrivada && <NavbarInterno />}
            
            <AppRoutes />
        </div>
    );
};

export default App;
