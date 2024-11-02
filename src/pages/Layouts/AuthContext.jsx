import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState(''); // Add state for message

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setMessage('Login successful!'); // Set message upon login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setMessage(''); // Clear message on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, message }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
