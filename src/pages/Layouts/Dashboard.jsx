import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/AuthNavbar';
import DashboardHome from '../Auth/DashboardHome'; // Default Home component for dashboard
import DashboardSettings from '../Auth/DashboardSettings'; // Example settings component

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="home" element={<DashboardHome />} />
                    <Route path="settings" element={<DashboardSettings />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
