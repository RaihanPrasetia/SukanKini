// src/pages/Layouts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
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

    const login = (token, name, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('role', role); // Ensure the role is saved in local storage
        setIsAuthenticated(true);
        setUserName(name);
        setUserRole(role); // Set the role state
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserName(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Correctly export useAuth
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
