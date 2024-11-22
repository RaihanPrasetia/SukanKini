import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import HomeMitra from '../Mitra/HomeMitra';
import MitraNavbar from '../../components/Navbar/MitraNavbar';
import ProfileMitra from '../Mitra/ProfileMitra';
import KelasMitra from '../Mitra/KelasMitra';
import Trainer from '../Mitra/Trainer';
import NotifMitra from '../Mitra/NotifMitra';
import Pembayaran from '../Mitra/Pembayaran';
import DetailKelas from '../Mitra/DetailKelas'
import Category from '../Mitra/Category';
import Bank from '../Mitra/Bank';

const Mitra = () => {
    // State to manage the sidebar open/close status
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Pass setSidebarOpen and sidebarOpen as props to MitraNavbar */}
            <MitraNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div
                className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64 ml-0' : 'ml-0'
                    }`}
            >
                {/* Main content */}
                <div className="container mx-auto ">
                    <Routes>
                        <Route path="/home" element={<HomeMitra />} />
                        <Route path="/profile" element={<ProfileMitra />} />
                        <Route path="/kelas" element={<KelasMitra />} />
                        <Route path="/kelas/:id" element={<DetailKelas />} />
                        <Route path="/trainer" element={<Trainer />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/notif" element={<NotifMitra />} />
                        <Route path="/pembayaran" element={<Pembayaran />} />
                        <Route path="/bank" element={<Bank />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Mitra;
