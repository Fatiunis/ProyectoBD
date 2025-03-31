import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);

    // Al cargar, revisa si ya hay sesión guardada en localStorage
    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioGuardado) {
            setUsuarioActual(usuarioGuardado);
        }
    }, []);

    // ✅ Esta función recibe un objeto usuario (nombre, rol, id)
    const login = (usuarioRecibido) => {
        setUsuarioActual(usuarioRecibido);
        localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));
        return { success: true, rol: usuarioRecibido.rol };
    };

    const logout = () => {
        setUsuarioActual(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuarioActual, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
