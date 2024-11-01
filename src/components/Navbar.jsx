import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModals';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Effect to handle scroll event and change background color
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'komunitas', 'kelas', 'pelatih', 'membership']; // Add IDs of all sections here
            const scrollPosition = window.scrollY + 1; // Adding 1 for better triggering on the top of sections

            const isInViewport = sections.some((sectionId) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= window.innerHeight && rect.bottom >= 0; // Checks if the section is in the viewport
                }
                return false;
            });

            setIsScrolled(isInViewport); // Set the isScrolled state based on the sections' visibility
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'} p-4`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className={`text-xl font-bold ${isScrolled ? 'text-green-600' : 'text-white'}`}>
                        <Link to="/">SukanKini</Link>
                    </div>

                    {/* Menu button for mobile */}
                    <button onClick={toggleMenu} className={`md:hidden focus:outline-none ${isScrolled ? 'text-green-600' : 'text-white'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16m-7 6h7'
                                }
                            />
                        </svg>
                    </button>

                    {/* Links */}
                    <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
                        <div className="flex flex-col md:flex-row mt-4 md:mt-0">
                            <Link to="#" className={`py-2 px-4 md:mr-4 transition duration-300 ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`}>
                                Home
                            </Link>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`py-2 px-4 md:mr-4 transition duration-300 ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`}
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('komunitas').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`py-2 px-4 md:mr-4 transition duration-300 ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`}
                            >
                                Komunitas
                            </Link>
                            {/* Dropdown for Kelas */}
                            <div className="relative group">
                                <button
                                    onClick={toggleDropdown}
                                    className={`py-2 px-4 md:mr-4 transition duration-300 flex items-center ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`}
                                >
                                    Kelas Latihan
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={isDropdownOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
                                        />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute z-50 left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg">
                                        <Link to="/Kelas" className="block px-4 py-2 hover:bg-gray-200 transition duration-200">
                                            Lihat Kelas
                                        </Link>
                                        <Link to="/Membership" className="block px-4 py-2 hover:bg-gray-200 transition duration-200">
                                            Buat Kelas
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                to="/Pelatih"
                                className={`py-2 px-4 md:mr-4 transition duration-300 ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`}
                            >
                                Pelatih Kami
                            </Link>
                        </div>

                        {/* Join Now Button */}
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-green-500 text-white hover:bg-white hover:text-green-500 py-2 px-4 rounded-full font-semibold transition duration-300"
                            >
                                Gabung Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export default Navbar;
