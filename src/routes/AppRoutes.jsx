import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Layouts/Dashboard';
import LandingPage from '../pages/Layouts/LandingPage';
//import AuthContext from '../pages/Layouts/AuthContext';


function AppRoutes() {

    //const { isAuthenticated } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
           {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} /> */}
            {<Route path="*" element={<Dashboard />} /> }
        </Routes>
    );
}

export default AppRoutes;
