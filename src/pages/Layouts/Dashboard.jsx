import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import Classes from '../Dashboard/Kelas';
import Settings from '../Dashboard/Settings'; 
import Profile from '../Profile/Profile'; 

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/videocategory" element={<VideoCategory />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
