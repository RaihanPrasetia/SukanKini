// src/pages/Layouts/Dashboard/Dashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from '../../components/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import Classes from '../Dashboard/Kelas';
import Settings from '../Dashboard/Settings'; 
import Profile from '../Profile/Profile'; 
=======
import AuthNavbar from '../../components/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Settings from '../Dashboard/Settings';
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
<<<<<<< HEAD
            <Navbar />
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/videocategory" element={<VideoCategory />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
=======
            <AuthNavbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="home" element={<Home />} /> {/* Default route for Dashboard */}
                    <Route path="settings" element={<Settings />} />
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
