import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/Layouts/LeandingPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Gunakan LandingPage */}
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoutes;
