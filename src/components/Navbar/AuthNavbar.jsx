import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/Layouts/AuthContext';
import { FaHome, FaUsers, FaVideo, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa'; // Import FontAwesome icons

const AuthNavbar = () => {
    const { logout, userName, user } = useAuth(); // Get userName and user from useAuth
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Function to close the dropdown when clicking outside
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
        <nav className="bg-white shadow-lg py-4 px-16 text-green-500">
            <div div className="container mx-auto flex justify-between items-center" >
                <Link to="/dashboard" className="text-2xl font-bold hover:text-green-600 transition duration-300">
                    <span className="text-yellow-300">Sukan</span>Kini
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="flex items-center text-lg hover:text-green-600 transition duration-300">
                        <FaHome className="h-5 w-5 mr-2" />
                        Home
                    </Link>
                    <Link to="/kelas" className="flex items-center text-lg hover:text-green-600 transition duration-300">
                        <FaGraduationCap className="h-5 w-5 mr-2" />
                        Kelas Pelatihan
                    </Link>
                    <Link to="/community" className="flex items-center text-lg hover:text-green-600 transition duration-300">
                        <FaUsers className="h-5 w-5 mr-2" />
                        Community
                    </Link>
                    <Link to="/video" className="flex items-center text-lg hover:text-green-600 transition duration-300">
                        <FaVideo className="h-5 w-5 mr-2" />
                        Video Tutorial
                    </Link>

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
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-green-300 transition duration-200 rounded-md"
                            >
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

            </div >
        </nav >
    );
};

export default AuthNavbar;
