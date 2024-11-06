// src/pages/Layouts/Dashboard/Dashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import KelasPelatihan from '../Dashboard/Kelas/KelasPelatihan'; // Ensure this is correctly imported
import Profile from '../Dashboard/Profile/Profile';
import Kelas from '../Dashboard/Profile/Kelas'; // Ensure this is correctly imported
import DetailKelas from '../Dashboard/Kelas/DetailKelas';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthNavbar />
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/video" element={<VideoCategory />} />
                    <Route path="/kelas" element={<KelasPelatihan />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="kelas" element={<Kelas />} />
                    </Route>
                    <Route path="/kelas/:id" element={<DetailKelas />} /> {/* Add route for DetailKelas */}
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
