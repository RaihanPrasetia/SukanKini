import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        // Redirect to landing page if not authenticated
        return <Navigate to="/" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to landing page if role doesn't match
        return <Navigate to="/" replace />;
    }

    // Render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
