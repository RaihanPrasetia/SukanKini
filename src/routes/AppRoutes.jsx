// src/pages/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Layouts/LandingPage';
import Dashboard from '../pages/Layouts/Dashboard';
import Admin from '../pages/Layouts/Admin';
import Mitra from '../pages/Layouts/Mitra';
import ProtectedRoute from '../contexts/ProtectedRoute';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Profile from '../pages/Admin/Profile';
import Pembayaran from '../pages/Admin/Pembayaran';


function AppRoutes() {
    return (<>
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
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/pembayaran" element={<Pembayaran />} />

            <Route
                path="/mitra/*"
                element={
                    <ProtectedRoute requiredRole="mitra">
                        <Mitra />
                    </ProtectedRoute>
                }
            />

            {/* Catch-all route for unmatched paths */}
        </Routes>
    </>

    );
}

export default AppRoutes;
