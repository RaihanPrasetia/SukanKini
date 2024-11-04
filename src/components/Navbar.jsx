import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // For the modal
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For the mobile menu
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home'); // Track the active section

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    const openAuthModal = (e) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'promosi', 'komunitas', 'kelas', 'pelatih', 'client', 'footer'];

            const currentSection = sections.find((sectionId) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= window.innerHeight && rect.bottom >= 0;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }

            const isHomeVisible = currentSection === 'home';
            setIsScrolled(!isHomeVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            const isMobile = window.innerWidth < 1024;
            const offset = section === 'home' ? 0 : isMobile ? 50 : 10;

            const sectionPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset + offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToHome = () => {
        scrollToSection('home');
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition duration-300 px-4 lg:px-16 ${isScrolled || window.innerWidth < 1024 ? 'bg-white shadow-lg' : 'bg-transparent'} p-4`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className={`text-xl font-bold ${isScrolled || window.innerWidth < 1024 ? 'text-green-500' : 'bg-transparent text-white'}`}>
                        <Link to="#" onClick={scrollToHome}>SukanKini</Link>
                    </div>

                    <button onClick={toggleMenu} className={`lg:hidden focus:outline-none ${isScrolled || window.innerWidth < 1024 ? 'text-green-500' : 'bg-transparent text-white'}`}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
                    </button>

                    <div className={`lg:flex lg:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-14 left-0 right-0 ${isScrolled || window.innerWidth < 1024 ? 'bg-white' : 'bg-transparent'} shadow-lg lg:shadow-none transition duration-300 lg:top-auto`}>
                        <div className="grid grid-cols-2 gap-4  lg:flex lg:space-x-4 p-4 lg:p-0">
                            {['about', 'promosi', 'komunitas', 'kelas', 'pelatih', 'client'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`flex items-center justify-center relative py-3 px-4 transition duration-300 rounded-lg ${isScrolled || isMenuOpen ? 'text-green-600 hover:bg-green-100' : 'text-white hover:bg-green-600'}`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                    {activeSection === section && (
                                        <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-green-600 transition duration-300" style={{ marginTop: '6px' }}></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="fixed bottom-10 left-6 lg:static lg:mt-0">
                        <button
                            onClick={openAuthModal}
                            className="bg-blue-500 text-white hover:bg-slate-100 hover:text-blue-500 lg:bg-green-500 lg:hover:text-green-500 py-2 px-4 rounded-xl font-semibold transition duration-300"
                        >
                            Gabung Sekarang
                        </button>
                    </div>

                </div>

                {activeSection !== 'home' && (
                    <button
                        onClick={scrollToHome} // Use the function here
                        className="fixed bottom-10 right-6 bg-blue-500 text-white p-2 rounded-full shadow-lg transition duration-300 hover:bg-slate-100 hover:text-blue-500"
                        aria-label="Scroll to home"
                    >
                        <FontAwesomeIcon icon={faArrowUp} className="w-6 h-4" />
                    </button>
                )}


                <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </nav>
        </>
    );
}

export default Navbar;
