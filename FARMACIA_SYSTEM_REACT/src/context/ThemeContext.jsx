import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [temaOscuro, setTemaOscuro] = useState(() => {
        return JSON.parse(localStorage.getItem("temaOscuro")) || false;
    });

    useEffect(() => {
        localStorage.setItem("temaOscuro", JSON.stringify(temaOscuro));
        document.body.classList.toggle("dark-mode", temaOscuro);
    }, [temaOscuro]);

    const toggleTema = () => {
        setTemaOscuro(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ temaOscuro, toggleTema }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
