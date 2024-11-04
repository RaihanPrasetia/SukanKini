import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/Layouts/AuthContext';
import { HomeIcon, UserGroupIcon, VideoCameraIcon, AcademicCapIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { logout, user } = useAuth(); // Mengambil data user dari useAuth
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-green-600 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300">
                    <span className="text-yellow-300">Sukan</span>Kini
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <HomeIcon className="h-5 w-5 mr-1" />
                        Home
                    </Link>
                    <Link to="/Community" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <UserGroupIcon className="h-5 w-5 mr-1" />
                        Community
                    </Link>
                    <Link to="/VideoCategory" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <VideoCameraIcon className="h-5 w-5 mr-1" />
                        Video Tutorial
                    </Link>
                    <Link to="/Classes" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <AcademicCapIcon className="h-5 w-5 mr-1" />
                        Kelas Pelatihan
                    </Link>
                    <Link to="/settings" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <Cog6ToothIcon className="h-5 w-5 mr-1" />
                        Pengaturan
                    </Link>
                </div>
                
                {/* Bagian Profil dan Logout di pojok kanan */}
                <div className="flex items-center space-x-4">
                    <Link to="/profile" className="flex items-center text-white hover:text-gray-200 transition duration-300 space-x-2">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                        ) : (
                            <img 
                                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Default Profile" 
                                className="h-8 w-8 rounded-full" 
                            />
                        )}
                        <span>{user?.displayName || "Profile"}</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center text-white hover:text-gray-200 transition duration-300">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
