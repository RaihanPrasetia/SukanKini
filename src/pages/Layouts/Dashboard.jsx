import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/AuthNavbar';
import Settings from '../Dashboard/Settings'; // Example settings component
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
