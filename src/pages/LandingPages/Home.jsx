import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthModal from '../../components/Modals';
import { FaArrowDown } from 'react-icons/fa';

export default function Home() {
    const [offsetY, setOffsetY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    };

    const scrollToAbout = () => {
        const kelasSection = document.getElementById("about");
        if (kelasSection) {
            window.scrollTo({
                top: kelasSection.offsetTop + 10, // Menggeser sedikit ke atas (50px)
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div
                className="relative bg-cover bg-center min-h-screen flex items-center justify-start text-left px-4 overflow-hidden"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundPositionY: `${offsetY * 0.5}px`, // Background parallax
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <motion.div
                    className="relative text-left text-white max-w-2xl md:ml-16" // Add margin-left for spacing
                    style={{ transform: `translateY(${offsetY * 0.1}px)` }} // Text parallax
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        SELAMAT DATANG <br /> DI SUKANKINI! FITLIFE!
                    </h1>
                    <p className="text-base sm:text-lg mb-8">
                        Transformasi Hidup Produktif! Temukan inspirasi, tantangan, dan pengetahuan untuk mencapai kesehatan & kebugaran yang optimal.
                    </p>

                    <motion.div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-4 mb-8">
                        <motion.button
                            onClick={() => setIsOpen(true)} // Open modal on click
                            className="bg-yellow-500 text-white py-2 text-lg font-semibold px-6 rounded-xl hover:bg-yellow-600 transition duration-300 mb-4 md:mb-0"
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                        >
                            Gabung Sekarang
                        </motion.button>

                        <motion.button
                            className="flex items-center text-white text-lg font-semibold bg-transparent border-2 border-white py-2 px-6 rounded-xl hover:bg-white hover:text-blue-800 transition duration-300"
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                            Putar Video
                        </motion.button>
                    </motion.div>
                </motion.div>
                <button
                    onClick={scrollToAbout}
                    className="absolute bottom-5 p-3 left-[50%] text-white bg-green-500 hover:bg-green-500 bg-opacity-40 border border-green-500 rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce"
                >
                    <FaArrowDown size={18} /> {/* Ikon panah ke bawah */}
                </button>
            </div>

            {/* Auth Modal */}
            <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
