import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Dashboard = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-grow bg-gray-100">
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
