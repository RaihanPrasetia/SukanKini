import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/Layouts/AuthContext';
import { FaHome, FaUsers, FaVideo, FaGraduationCap, FaSignOutAlt, FaBars, FaUser } from 'react-icons/fa';

export default function AuthNavbar() {
    const { logout, userName, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
            className={`fixed top-0 left-0 w-full py-4 px-6 md:px-16 z-40 container mx-auto flex justify-between items-center transition-all duration-200 ${scrolled ? 'bg-green-500 shadow-lg text-white' : 'bg-transparent text-green-500'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/dashboard" className="text-2xl font-bold  hover:text-green-600 transition duration-300">
                    <span className="text-yellow-300">Sukan</span>Kini
                </Link>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        className={`text-3xl ${scrolled ? 'text-green-500' : 'text-white'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Navigation Links */}
                <div
                    className={`${mobileMenuOpen
                        ? `absolute top-16 right-0 w-max    shadow-lg p-6 rounded-lg flex flex-col items-end space-y-4 z-50 ${scrolled ? 'bg-green-500 shadow-lg text-white' : 'text-green-500 bg-transparent'
                        }`
                        : 'hidden '
                        } md:flex  md:flex-row md:space-x-8 md:items-center`}
                >
                    <Link
                        to="/home"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg hover:text-green-600 transition ${isActive('/home')}`}
                    >
                        <FaHome className="h-5 w-5 mr-2" />
                        Home
                    </Link>
                    <Link
                        to="/kelas"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg hover:text-green-600 transition ${isActive('/kelas')}`}
                    >
                        <FaGraduationCap className="h-5 w-5 mr-2" />
                        Kelas Pelatihan
                    </Link>
                    <Link
                        to="/community"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg hover:text-green-600 transition ${isActive('/community')}`}
                    >
                        <FaUsers className="h-5 w-5 mr-2" />
                        Community
                    </Link>
                    <Link
                        to="/video"
                        onClick={handleMenuClick}
                        className={`flex items-center text-lg hover:text-green-600 transition ${isActive('/video')}`}
                    >
                        <FaVideo className="h-5 w-5 mr-2" />
                        Video Tutorial
                    </Link>
                    <Link
                        to="/profile"
                        onClick={handleMenuClick}
                        className={`block lg:hidden items-center text-lg hover:text-green-600 transition ${isActive('/profile')}`}
                    >
                        <FaUser className="inline mr-2" />
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block lg:hidden items-center text-red-500 text-lg hover:text-red-600 transition"
                    >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                    </button>
                </div>

                {/* Profile and Logout Section */}
                <div className="relative hidden lg:flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <div className="flex items-center text-lg hover:text-green-600 transition space-x-2">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Default Profile"
                                className="h-12 w-12 rounded-full"
                            />
                        )}
                        <span>{userName || 'Profile'}</span>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-[60px] mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
                            <Link
                                to="/profile"
                                onClick={handleMenuClick}
                                className="block px-4 py-2 text-gray-700 hover:bg-green-300 transition duration-200 rounded-md"
                            >
                                <FaUser className="inline mr-2" />
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
            </div>
        </nav>
    );
}
