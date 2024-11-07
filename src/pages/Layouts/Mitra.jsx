import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import HomeMitra from '../Mitra/HomeMitra';
import MitraNavbar from '../../components/Navbar/MitraNavbar';
import ProfileMitra from '../Mitra/ProfileMitra';
import KelasMitra from '../Mitra/KelasMitra';
import NotifMitra from '../Mitra/NotifMitra';
import Pembayaran from '../Mitra/Pembayaran';
import DetailKelas from '../Mitra/DetailKelas'

const Mitra = () => {
    // State to manage the sidebar open/close status
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Pass setSidebarOpen and sidebarOpen as props to MitraNavbar */}
            <MitraNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div
                className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'
                    }`}
            >
                {/* Main content */}
                <div className="container mx-auto ">
                    <Routes>
                        <Route path="/home" element={<HomeMitra />} />
                        <Route path="/profile" element={<ProfileMitra />} />
                        <Route path="/kelas" element={<KelasMitra />} />
                        <Route path="/kelas/:id" element={<DetailKelas />} />
                        <Route path="/notif" element={<NotifMitra />} />
                        <Route path="/pembayaran" element={<Pembayaran />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Mitra;
