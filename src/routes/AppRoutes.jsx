import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Layouts/Dashboard';
import LandingPage from '../pages/Layouts/LandingPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} /> {/* Use /* to nest routes */}
        </Routes>
    );
}

export default AppRoutes;
