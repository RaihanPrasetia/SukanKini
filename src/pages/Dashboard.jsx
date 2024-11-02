// src/pages/Dashboard.jsx
import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

const Dashboard = () => {
return (
<div className="text-center min-h-screen bg-gray-100">
    {/* Dashboard Navbar */}
    <DashboardNavbar />

    {/* Dashboard Content */}
    <main className="px-8 py-10 min-h-screen bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1728486144678-95cb7c5f7463?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }}>
        <div
            className="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-full h-[80vh] mx-auto flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
                <p className="mt-4 text-xl text-yellow-500 font-semibold">Hai, Selamat Datang Kembali!</p>
                <p className="mt-2 text-lg text-gray-700">Ingin Olahraga Apa Hari ini?</p>
            </div>

            {/* Class Cards */}
            <div className="flex justify-center gap-6 mt-8 flex-grow">
                <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Zumba" className="w-full h-full object-cover" />
                    <div
                        className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-lg font-semibold py-2 text-center">
                        Zumba
                    </div>
                </div>
                <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1706029831405-619b27e3260c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Pembentukan Otot" className="w-full h-full object-cover" />
                    <div
                        className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-lg font-semibold py-2 text-center">
                        Pembentukan Otot
                    </div>
                </div>
            </div>

            <button
                className="mt-8 px-6 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-200">
                Lihat Kelas
            </button>
        </div>

    </main>

</div>
);
};

export default Dashboard;