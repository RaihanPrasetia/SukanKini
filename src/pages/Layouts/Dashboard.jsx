import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import KelasPelatihan from '../Dashboard/Kelas/KelasPelatihan'; // Ensure this is correctly imported
import Profile from '../Dashboard/Profile/Profile';
import Kelas from '../Dashboard/Profile/Kelas';
import Pembayaran from '../Dashboard/Profile/Pembayaran';
import Notifikasi from '../Dashboard/Profile/Notifikasi';
import DetailKelas from '../Dashboard/Kelas/DetailKelas';


const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthNavbar />
            <div className="container mx-auto p-4">
                <Routes>
                    {/* Main routes */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/video" element={<VideoCategory />} />
                    <Route path="/kelas" element={<KelasPelatihan />} />

                    {/* Profile routes */}
                    <Route path="/profile" element={<Profile />}>
                        <Route path="kelas" element={<Kelas />} />
                        <Route path="notifikasi" element={<Notifikasi />} />
                        <Route path="pembayaran" element={<Pembayaran />} />
                    </Route>

                    {/* Dynamic class detail route */}
                    <Route path="/kelas/:id" element={<DetailKelas />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
