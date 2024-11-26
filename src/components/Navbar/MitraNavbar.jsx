import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile } from '../../controllers/userController';
import { FaUser, FaSignOutAlt, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import {
    AiFillBank,
    AiFillBell,
    AiFillHome,
    AiOutlineCreditCard,
    AiOutlineDown,
    AiOutlineUp,
    AiOutlineUser,
} from 'react-icons/ai';

const MitraNavbar = ({ sidebarOpen, setSidebarOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserProfile();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const isActive = (path) =>
        location.pathname.startsWith(path)
            ? 'bg-white text-green-500 shadow-md'
            : 'text-white hover:bg-green-400 hover:text-white';

    return (
        <div className="fixed top-0 w-full z-50 flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-600 to-green-700 text-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300`}
            >
                {/* Logo */}
                <div className="py-6 text-center border-b border-green-500">
                    <Link
                        to="/mitra/home"
                        className="text-2xl font-bold text-yellow-300 hover:text-yellow-400 transition"
                    >
                        <span>Sukan</span>Kini
                    </Link>
                </div>

                {/* Navigation */}
                <ul className="mt-6 space-y-6">
                    <li className={`py-3 px-6 flex items-center rounded-lg ${isActive('/mitra/home')}`}>
                        <AiFillHome className="mr-3 text-xl" />
                        <Link to="/mitra/home">Home</Link>
                    </li>

                    {/* Dropdown Menu */}
                    <li
                        className="py-3 px-6 flex items-center justify-between rounded-lg cursor-pointer hover:bg-green-700"
                        onClick={toggleDropdown}
                    >
                        <div className="flex items-center">
                            <FaClipboardList className="mr-3 text-xl" />
                            <span>Master Data</span>
                        </div>
                        {isDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                    </li>
                    {isDropdownOpen && (
                        <ul className="ml-8 mt-2 space-y-3">
                            <li className={`py-2 px-4 rounded-lg ${isActive('/mitra/kelas')}`}>
                                <Link to="/mitra/kelas" className="flex items-center">
                                    <FaChalkboardTeacher className="mr-3 text-lg" />
                                    Data Kelas
                                </Link>
                            </li>
                            <li className={`py-2 px-4 rounded-lg ${isActive('/mitra/trainer')}`}>
                                <Link to="/mitra/trainer" className="flex items-center">
                                    <AiOutlineUser className="mr-3 text-lg" />
                                    Data Pelatih
                                </Link>
                            </li>
                            <li className={`py-2 px-4 rounded-lg ${isActive('/mitra/category')}`}>
                                <Link to="/mitra/category" className="flex items-center">
                                    <FaClipboardList className="mr-3 text-lg" />
                                    Data Kategori
                                </Link>
                            </li>
                        </ul>
                    )}

                    <li className={`py-3 px-6 flex items-center rounded-lg ${isActive('/mitra/pembayaran')}`}>
                        <AiOutlineCreditCard className="mr-3 text-xl" />
                        <Link to="/mitra/pembayaran">Pembayaran</Link>
                    </li>
                    <li className={`py-3 px-6 flex items-center rounded-lg ${isActive('/mitra/bank')}`}>
                        <AiFillBank className="mr-3 text-xl" />
                        <Link to="/mitra/bank">Bank</Link>
                    </li>
                </ul>
            </div>

            {/* Top Navbar */}
            <nav
                className={`flex items-center justify-between w-full bg-green-500 text-white shadow-md py-4 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'
                    }`}
            >
                {/* Sidebar Toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
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

                {/* Notification and Profile */}
                {userData && (
                    <div className="flex items-center space-x-6">
                        <Link to="/mitra/notif">
                            <AiFillBell className="text-2xl hover:text-yellow-400 transition" />
                        </Link>
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={`/images/profile/${userData.image_path}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 bg-white text-gray-700 rounded-md shadow-lg p-2 w-40">
                                    <Link
                                        to="/mitra/profile"
                                        className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                    >
                                        <FaUser className="inline mr-2" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-red-300 rounded-md"
                                    >
                                        <FaSignOutAlt className="inline mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default MitraNavbar;
