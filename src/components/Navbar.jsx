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

<<<<<<< HEAD
    const buttonStyles = `py-2 px-4 md:mr-4 transition duration-300 ${isScrolled ? 'text-green-600 hover:text-green-800' : 'text-white hover:text-blue-300'}`;
=======
    const scrollToHome = () => {
        scrollToSection('home');
    };
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition duration-300 px-4 lg:px-16 ${isScrolled || window.innerWidth < 1024 ? 'bg-white shadow-lg' : 'bg-transparent'} p-4`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className={`text-xl font-bold ${isScrolled || window.innerWidth < 1024 ? 'text-green-500' : 'bg-transparent text-white'}`}>
                        <Link to="#" onClick={scrollToHome}>SukanKini</Link>
                    </div>

<<<<<<< HEAD
                    {/* Menu button for mobile */}
                    <button 
                        onClick={toggleMenu} 
                        className={`md:hidden focus:outline-none ${isScrolled ? 'text-green-600' : 'text-white'}`} 
                        aria-expanded={isOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            />
                        </svg>
                    </button>

                    {/* Links */}
                    <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
                        <div className="flex flex-col md:flex-row mt-4 md:mt-0">
                            <button onClick={() => scrollToSection('home')} className={buttonStyles}>
                                Home
                            </button>
                            <button onClick={() => scrollToSection('about')} className={buttonStyles}>
                                Tentang Kami
                            </button>
                            <button onClick={() => scrollToSection('membership')} className={buttonStyles}>
                                Promosi
                            </button>
                            <button onClick={() => scrollToSection('komunitas')} className={buttonStyles}>
                                Komunitas
                            </button>
                            <button onClick={() => scrollToSection('kelas')} className={buttonStyles}>
                                Kelas
                            </button>
                            <button onClick={() => scrollToSection('pelatih')} className={buttonStyles}>
                                Pelatih
                            </button>
                            <button onClick={() => scrollToSection('client')} className={buttonStyles}>
                                Testimoni
                            </button>
=======
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
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6
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
