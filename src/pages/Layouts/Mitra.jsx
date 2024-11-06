import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import Settings from '../Dashboard/Settings'; // Example settings component
import Footer from '../../components/Footer';
import HomeMitra from '../Mitra/HomeMitra';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthNavbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path='/home' element={<HomeMitra />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
