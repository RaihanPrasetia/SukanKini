import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import HomeMitra from '../Mitra/HomeMitra';
import MitraNavbar from '../../components/Navbar/MitraNavbar';

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
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Mitra;
