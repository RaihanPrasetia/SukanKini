import React, { useState, useEffect } from 'react';
import { useAuth } from '../../pages/Layouts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import FontAwesome icons



const MitraNavbar = ({ sidebarOpen, setSidebarOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout, userName, user } = useAuth(); // Get userName and user from useAuth
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown')) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);
    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white p-2 text-green-500 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } z-50`}
            >
                <div className="py-5 text-center text-lg font-bold border-b border-green-500">
                    <Link to="/mitra/home" className="text-2xl font-bold hover:text-green-600 transition duration-300 text-green-500">
                        <span className="text-yellow-300">Sukan</span>Kini
                    </Link>
                </div>
                <ul className="mt-4 text-center space-y-5">
                    <li className="py-2 hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                        <Link to="/mitra/home">Home</Link>
                    </li>

                    <li className="py-2 hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                        <Link to="/mitra/kelas">Kelas</Link>
                    </li>
                    <li className="py-2 hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                        <Link to="/mitra/pemberitahuan">Pemberitahuan</Link>
                    </li>
                    <li className="py-2 hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                        <Link to="/mitra/pembayaran">Pembayaran</Link>
                    </li>
                    <li className="py-2 hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                        <Link to="/mitra/komunitas">Komunitas</Link>
                    </li>

                </ul>
            </div>

            {/* Navbar */}
            <nav
                className={`flex items-center justify-between px-16 w-full bg-white py-4 shadow-md transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'
                    }`}
            >
                <div className='flex items-center justify-center space-x-5'>

                    <button
                        className="text-green-500 hover:text-green-600 focus:outline-none"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {/* Icon for the sidebar toggle */}
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Profile and Logout Section */}
                <div
                    className="relative flex items-center profile-dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <div className="flex items-center text-lg hover:text-green-600 transition duration-300 space-x-2 cursor-pointer">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Default Profile"
                                className="h-12 w-12 rounded-full"
                            />
                        )}
                        <span>{userName || "Profile"}</span> {/* Display userName here */}
                    </div>

                    {/* Dropdown Menu for Profile and Logout */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-[60px] mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
                            <Link
                                to="/mitra/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-green-300 transition duration-200 rounded-md"
                            >
                                <FaUser className='inline mr-2' />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-300 transition duration-200 rounded-md"
                            >
                                <FaSignOutAlt className="inline mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default MitraNavbar;
