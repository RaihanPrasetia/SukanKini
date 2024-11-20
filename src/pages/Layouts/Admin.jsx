import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../components/Footer';
import AdminDashboard from '../Admin/AdminDashboard';
import Pembayaran from '../Admin/Pembayaran';
import ProfileUser from '../Admin/ProfileUser';
import ProfileMitra from '../Admin/ProfileMitra';
import ProfileTrainer from '../Admin/ProfileTrainer';
import DataKelas from '../Admin/DataKelas';
import { useAuth } from '../../contexts/AuthContext';


const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate(); // Deklarasi useNavigate
    const sidebarItems = [
        { label: 'Dashboard', icon: '📄', page: 'admin/dashboard' },
        { label: 'Profil Mitra', icon: '👥', page: 'admin/profile/mitra' },
        { label: 'Profil User', icon: '👤', page: 'admin/profile/user' },
        { label: 'Profil Trainer', icon: '🎓', page: 'admin/profile/trainer' },
        { label: 'Kelas', icon: '📦', page: 'admin/kelas' },
        { label: 'Pembayaran', icon: '💰', page: 'admin/pembayaran' },
        { label: 'Logout', icon: '🚪', page: 'logout' },
    ];

    // Fungsi untuk menangani klik menu
    const handleMenuClick = (page) => {
        if (page === 'logout') {
            // Logout logic can go here if needed, then navigate away
            logout();
            navigate('/');
        } else {
            navigate(`/${page}`); // Navigate ke halaman sesuai dengan path yang ada
        }
    };

    return (
        <>
            <div className="min-h-screen flex bg-gray-100 py-4">
                <aside className="w-64 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-r-2xl flex flex-col items-center">
                    <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User Avatar"
                        className="rounded-full border-4 border-white mb-4"
                        style={{ width: '75px', height: '75px' }}
                    />
                    <h2 className="text-2xl font-bold text-white">Tegar</h2>
                    <p className="text-gray-200 mb-6">Admin</p>
                    <nav className="w-full space-y-4">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleMenuClick(item.page)} // Handle navigation on click
                                className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                            >
                                <span className="mr-3 text-xl">{item.icon}</span> {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="profile/mitra" element={<ProfileMitra />} />
                        <Route path="profile/user" element={<ProfileUser />} />
                        <Route path="profile/trainer" element={<ProfileTrainer />} />
                        <Route path="kelas" element={<DataKelas />} />
                        <Route path="pembayaran" element={<Pembayaran />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
