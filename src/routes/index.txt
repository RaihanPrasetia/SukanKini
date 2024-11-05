// src/pages/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Layouts/LandingPage';
import Dashboard from '../pages/Layouts/Dashboard';
import Admin from '../pages/Layouts/Admin';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/" element={<LandingPage />} />

            {/* User Dashboard route - no /home prefix */}
            <Route
                path="*"
                element={
                    <ProtectedRoute requiredRole="user">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Admin Dashboard route */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <Admin />
                    </ProtectedRoute>
                }
            />

            {/* Catch-all route for unmatched paths */}
        </Routes>
    );
}

export default AppRoutes;
