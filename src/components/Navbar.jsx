import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
const [isOpen, setIsOpen] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleMenu = () => {
setIsOpen(!isOpen);
};

const toggleDropdown = () => {
setIsDropdownOpen(!isDropdownOpen);
};

return (
<nav className="bg-green-600 p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
            <Link to="/">SukanKini</Link>
        </div>

        {/* Menu button for mobile */}
        <button onClick={toggleMenu} className="text-white md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16m-7 6h7' } />
            </svg>
        </button>

        {/* Links */}
        <div className={`md:flex md:items-center ${ isOpen ? 'block' : 'hidden' } w-full md:w-auto`}>
            <div className="flex flex-col md:flex-row mt-4 md:mt-0">
                <Link to="/" className="text-white hover:text-blue-300 py-2 px-4 md:mr-4 transition duration-300">
                Home
                </Link>
                <Link to="/About" className="text-white hover:text-blue-300 py-2 px-4 md:mr-4 transition duration-300">
                Tentang Kami
                </Link>
                <Link to="/Komunitas"
                    className="text-white hover:text-blue-300 py-2 px-4 md:mr-4 transition duration-300">
                Komunitas
                </Link>

                {/* Dropdown for Kelas */}
                <div className="relative group">
                    <button onClick={toggleDropdown}
                        className="text-white hover:text-blue-300 py-2 px-4 md:mr-4 transition duration-300 flex items-center">
                        Kelas Latihan
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDropdownOpen
                                ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7' } />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                    <div
                        className="absolute z-50 left-0 transform transition duration-300 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 bg-white text-gray-800 rounded-md shadow-lg mt-2">
                        <Link to="/Kelas" className="block px-4 py-2 hover:bg-gray-200 transition duration-200">
                        Lihat Kelas
                        </Link>
                        <Link to="/Membership" className="block px-4 py-2 hover:bg-gray-200 transition duration-200">
                        Buat Kelas
                        </Link>
                    </div>
                    )}
                </div>


                <Link to="/Pelatih"
                    className="text-white hover:text-blue-300 py-2 px-4 md:mr-4 transition duration-300">
                Pelatih Kami
                </Link>
            </div>

            {/* Join Now Button */}
            <div className="mt-4 md:mt-0">
                <Link to="/join"
                    className="bg-yellow-400 text-white-800 hover:bg-yellow-500 py-2 px-4 rounded-full font-semibold transition duration-300">
                Gabung Sekarang
                </Link>
            </div>
        </div>
    </div>
</nav>
);
}

export default Navbar;