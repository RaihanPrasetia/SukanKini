import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Layouts/Dashboard';
import LandingPage from '../pages/Layouts/LandingPage';


function AppRoutes() {

    //const { isAuthenticated } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Gunakan LandingPage */}
            <Route path="/" element={<Dashboard />} />      
        </Routes>
    );
}

export default AppRoutes;
