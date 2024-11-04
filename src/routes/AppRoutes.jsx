// src/pages/AppRoutes.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Layouts/LandingPage';
<<<<<<< HEAD
//import AuthContext from '../pages/Layouts/AuthContext';


function AppRoutes() {

    //const { isAuthenticated } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
           {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} /> */}
            {<Route path="*" element={<Dashboard />} /> }
=======
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
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6
        </Routes>
    );
}

export default AppRoutes;
