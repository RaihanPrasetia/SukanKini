import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Use useLocation for current URL
import { useAuth } from '../../pages/Layouts/AuthContext';
import { FaHome, FaUsers, FaVideo, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa'; // Import FontAwesome icons

export default function AuthNavbar() {
    const { logout, userName, user } = useAuth(); // Get userName and user from useAuth
    const navigate = useNavigate();
    const location = useLocation(); // To get the current URL
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false); // State to track scroll position

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true); // If the page is scrolled more than 50px, set the state to true
            } else {
                setScrolled(false); // Otherwise, set it back to false
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top when a menu item is clicked
    const handleMenuClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
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

    // Function to check if the current path is active
    const isActive = (path) => location.pathname === path
        ? `border-b-4 border-green-500 ${scrolled ? 'border-green-500' : 'border-white'}`
        : '';


    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full py-4 px-16 text-green-500 z-40 container mx-auto flex justify-between items-center transition-all duration-200 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent text-white'
                    }`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/dashboard" className="text-2xl font-bold hover:text-green-600 transition duration-300">
                        <span className="text-yellow-300">Sukan</span>Kini
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/home"
                            onClick={handleMenuClick} // Scroll to top on click
                            className={`flex items-center text-lg hover:text-green-600 transition  ${isActive('/home')}`}
                        >
                            <FaHome className="h-5 w-5 mr-2" />
                            Home
                        </Link>
                        <Link
                            to="/kelas"
                            onClick={handleMenuClick} // Scroll to top on click
                            className={`flex items-center text-lg hover:text-green-600 transition  ${isActive('/kelas')}`}
                        >
                            <FaGraduationCap className="h-5 w-5 mr-2" />
                            Kelas Pelatihan
                        </Link>
                        <Link
                            to="/community"
                            onClick={handleMenuClick} // Scroll to top on click
                            className={`flex items-center text-lg hover:text-green-600 transition  ${isActive('/community')}`}
                        >
                            <FaUsers className="h-5 w-5 mr-2" />
                            Community
                        </Link>
                        <Link
                            to="/video"
                            onClick={handleMenuClick} // Scroll to top on click
                            className={`flex items-center text-lg hover:text-green-600 transition  ${isActive('/video')}`}
                        >
                            <FaVideo className="h-5 w-5 mr-2" />
                            Video Tutorial
                        </Link>
                    </div>

                    {/* Profile and Logout Section */}
                    <div
                        className="relative flex items-center profile-dropdown"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="flex items-center text-lg hover:text-green-600 transition  space-x-2 cursor-pointer">
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
                                    onClick={handleMenuClick}
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
                </div>
            </nav>
        </>
    );
}
