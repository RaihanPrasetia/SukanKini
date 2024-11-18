import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to a "not authorized" page if the role doesn't match
        return <Navigate to="/" />;
    }

    // If authenticated and role matches (or no role requirement), render the children
    return children;
};

export default ProtectedRoute;
