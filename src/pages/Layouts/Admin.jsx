import React, { useState } from 'react'; // Tambahkan useState
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaBoxOpen, FaDollarSign, FaSignOutAlt } from 'react-icons/fa'; // Import React Icons
import AdminDashboard from '../Admin/AdminDashboard';
import Pembayaran from '../Admin/Pembayaran';
import ProfileUser from '../Admin/ProfileUser';
import ProfileMitra from '../Admin/ProfileMitra';
import ProfileTrainer from '../Admin/ProfileTrainer';
import DataKelas from '../Admin/DataKelas';
import DataVideo from '../Admin/DataVideo';
import { useAuth } from '../../contexts/AuthContext';
import AuthFooter from '../../components/AuthFooter';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false); // State untuk dropdown

    // Fungsi navigasi
    const handleMenuClick = (page) => {
        if (page === 'logout') {
            logout();
            navigate('/');
        } else {
            navigate(`/${page}`);
        }
    };

    return (
        <>
            <div className="min-h-screen flex bg-gray-100 py-4">
                <aside className="w-72 bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-2 rounded-r-2xl flex flex-col items-center">
                    <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User Avatar"
                        className="rounded-full border-4 border-white mb-4"
                        style={{ width: '75px', height: '75px' }}
                    />
                    <h2 className="text-2xl font-bold text-white">Tegar</h2>
                    <p className="text-gray-200 mb-6">Admin</p>
                    <nav className="w-full space-y-4">
                        {/* Dashboard */}
                        <button
                            onClick={() => handleMenuClick('admin/dashboard')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaTachometerAlt className="mr-3 text-xl" /> Dashboard
                        </button>

                        {/* Data Pengguna Dropdown */}
                        <div className="w-full">
                            <button
                                onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                                className="w-full flex items-center justify-between text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                            >
                                <div className="flex items-center">
                                    <FaUsers className="mr-3 text-xl" /> Data Pengguna
                                </div>
                                <span>{isDropdownOpen ? '▲' : '▼'}</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="ml-4 mt-2 space-y-2">
                                    <button
                                        onClick={() => handleMenuClick('admin/profile/mitra')}
                                        className="w-full text-white text-left px-4 py-2 hover:bg-indigo-700 hover:text-gray-300 rounded-lg"
                                    >
                                        Profil Mitra
                                    </button>
                                    <button
                                        onClick={() => handleMenuClick('admin/profile/user')}
                                        className="w-full text-white text-left px-4 py-2 hover:bg-indigo-700 hover:text-gray-300 rounded-lg"
                                    >
                                        Profil User
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profil Trainer */}
                        <button
                            onClick={() => handleMenuClick('admin/profile/trainer')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaChalkboardTeacher className="mr-3 text-xl" /> Profil Trainer
                        </button>

                        {/* Kelas */}
                        <button
                            onClick={() => handleMenuClick('admin/kelas')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaBoxOpen className="mr-3 text-xl" /> Kelas
                        </button>
                        <button
                            onClick={() => handleMenuClick('admin/video')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaBoxOpen className="mr-3 text-xl" /> Video
                        </button>

                        {/* Pembayaran */}
                        <button
                            onClick={() => handleMenuClick('admin/pembayaran')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaDollarSign className="mr-3 text-xl" /> Pembayaran
                        </button>

                        {/* Logout */}
                        <button
                            onClick={() => handleMenuClick('logout')}
                            className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            <FaSignOutAlt className="mr-3 text-xl" /> Logout
                        </button>
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
                        <Route path="video" element={<DataVideo />} />
                    </Routes>
                </div>
            </div>
            <AuthFooter />
        </>
    );
};

export default Dashboard;
