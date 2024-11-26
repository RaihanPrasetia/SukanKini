import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from "../../controllers/userController";
import { FaHome, FaUsers, FaVideo, FaGraduationCap, FaSignOutAlt, FaBars, FaUser } from 'react-icons/fa';

export default function AuthNavbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserProfile();
                setUserData(data.image_path); // Assuming 'data' contains the necessary fields (name, image_path, etc.)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = () => {
        window.scrollTo(0, 0);
        if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    const isActive = (path) =>
        location.pathname === path
            ? `border-b-4 border-yellow-500 ${scrolled ? 'border-green-500' : 'border-white'}`
            : '';

    return (
        <nav
            className={`fixed top-0 left-0 w-full py-4 px-6 md:px-16 z-40 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-green-600 shadow-lg text-white' : 'bg-transparent text-green-500'
                }`}
        >

            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/home" className="text-2xl font-extrabold text-white hover:text-yellow-400 transition duration-300">
                    <span className="text-yellow-400">Sukan</span>Kini
                </Link>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        className={`text-3xl ${scrolled ? 'text-white' : 'text-green-600'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Navigation Links */}
                <div
                    className={`${mobileMenuOpen
                        ? `absolute top-16 right-0 w-64 bg-green-500 shadow-lg p-6 rounded-lg flex flex-col items-end space-y-4 z-50 text-white`
                        : 'hidden '
                        } md:flex md:flex-row md:space-x-8 md:items-center`}
                >
                    <Link
                        to="/home"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg font-medium hover:text-yellow-400 transition ${isActive('/home')}`}
                    >
                        <FaHome className="h-6 w-6 mr-2" />
                        Home
                    </Link>
                    <Link
                        to="/kelas"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg font-medium hover:text-yellow-400 transition ${isActive('/kelas')}`}
                    >
                        <FaGraduationCap className="h-6 w-6 mr-2" />
                        Kelas Pelatihan
                    </Link>
                    <Link
                        to="/community"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg font-medium hover:text-yellow-400 transition ${isActive('/community')}`}
                    >
                        <FaUsers className="h-6 w-6 mr-2" />
                        Community
                    </Link>
                    <Link
                        to="/video"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg font-medium hover:text-yellow-400 transition ${isActive('/video')}`}
                    >
                        <FaVideo className="h-6 w-6 mr-2" />
                        Video Tutorial
                    </Link>
                    <Link
                        to="/profile"
                        onClick={handleMenuClick}
                        className={`flex items-center lg:hidden text-lg font-medium hover:text-yellow-400 transition ${isActive('/profile')}`}
                    >
                        <FaUser className="h-6 w-6 mr-2" />
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center lg:hidden text-red-500 text-lg font-medium hover:text-red-600 transition"
                    >
                        <FaSignOutAlt className="h-6 w-6 mr-2" />
                        Logout
                    </button>
                </div>

                {/* Profile and Logout Section */}
                <div className="relative hidden lg:flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <div className="flex items-center space-x-2">
                        <img
                            src={userData ? `/images/profile/${userData}` : '/default_profile.jpg'}
                            alt="Profile"
                            className="h-14 w-14 rounded-full border-2 border-white"
                        />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-[60px] mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-10">
                            <Link
                                to="/profile"
                                onClick={handleMenuClick}
                                className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition duration-200 rounded-md"
                            >
                                <FaUser className="inline mr-2" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 transition duration-200 rounded-md"
                            >
                                <FaSignOutAlt className="inline mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
