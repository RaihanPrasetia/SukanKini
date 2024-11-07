// src/pages/Layouts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Membuat Context untuk Auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Memeriksa apakah token ada di localStorage
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const role = localStorage.getItem('role');

        if (token) {
            setIsAuthenticated(true);
        }
        if (name) {
            setUserName(name);
        }
        if (role) {
            setUserRole(role);
        }
    }, []);

    // Fungsi untuk login
    const login = (token, name, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('role', role); // Menyimpan role di localStorage
        setIsAuthenticated(true);
        setUserName(name);
        setUserRole(role); // Menyimpan role
    };

    // Fungsi untuk logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserName(null);
        setUserRole(null);
    };

    // Return provider dengan context
    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook untuk mengakses AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
