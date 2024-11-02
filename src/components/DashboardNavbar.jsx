// src/components/DashboardNavbar.jsx
import React from 'react';

const DashboardNavbar = () => {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <img src="" alt="FitLife Logo" className="w-24" />
            <nav className="flex items-center space-x-6">
                <a href="#" className="text-green-700 font-semibold">Dashboard</a>
                <a href="#" className="text-gray-600">Komunitas</a>
                <a href="#" className="text-gray-600">Video Tutorial</a>
                <a href="#" className="text-gray-600">Kelas Latihan</a>
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="w-10 h-10 rounded-full" />
                </a>
            </nav>
        </div>
    );
};

export default DashboardNavbar;
