import React, { useRef, useEffect, useState } from 'react';
import { FaUserCheck, FaVideo, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

function About() {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    // Check if the element is in view
    const handleScroll = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if the element is in the viewport
            if (rect.top <= windowHeight - 400 && rect.bottom >= 0) {
                setIsInView(true);
            } else {
                setIsInView(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Animation variants for the main content
    const fadeInRight = {
        initial: { opacity: 0, x: 0 },
        animate: {
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : 0,
        },
        transition: {
            duration: 1.8, // Increased duration for smoother animation
            ease: 'easeInOut', // Changed easing function
        },
    };

    const fadeInLeft = {
        initial: { opacity: 0, x: 0 },
        animate: {
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : -30,
        },
        transition: {
            duration: 1.8, // Increased duration for smoother animation
            ease: 'easeInOut', // Changed easing function
        },
    };

    // Individual animation variants for titles
    const titleVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (i) => ({
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
            transition: {
                delay: i * 0.3, // Increased delay for smoother stagger
                duration: 1.2, // Slightly increased duration for titles
                ease: 'easeInOut', // Changed easing function
            },
        }),
    };

    return (
        <div className="w-full flex flex-col md:flex-row bg-white">
            {/* Left Image Section with animation from left to right */}
            <motion.div
                className="relative w-full lg:w-1/2 h-80 md:h-auto overflow-hidden bg-green-500 hidden md:block"
                initial="initial"
                animate="animate"
                variants={fadeInLeft}
                ref={ref}
            >
                <img
                    src="/assets/images/left-img.png"
                    alt=""
                    className="absolute left-0 bottom-0 w-full h-full object-cover"
                />
            </motion.div>

            {/* Right Content Section with animation from right to left */}
            <motion.div
                className="p-6 md:p-8 lg:p-20 bg-white rounded-lg shadow-lg mx-auto"
                initial="initial"
                animate="animate"
                variants={fadeInRight}
            >
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center text-green-700 mb-4 lg:mb-6">
                    KENAPA HARUS KAMI?
                </h1>
                <p className="text-justify lg:text-center text-gray-700 mb-6 lg:mb-8">
                    Kami punya segala yang Anda butuhkan untuk mencapai tujuan kesehatan Anda.
                    Bergabunglah dengan komunitas yang mendukung dan nikmati program khusus yang
                    dirancang hanya untuk Anda.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* Program Khusus */}
                    <motion.div className="flex items-start" variants={titleVariants} custom={0}>
                        <FaUserCheck className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-lg lg:text-xl font-semibold text-green-700">
                                Program Khusus
                            </h2>
                            <p className="text-gray-700 text-justify">
                                Program latihan yang disesuaikan dengan kebutuhan individu,
                                memastikan setiap anggota mendapatkan perhatian dan rencana yang sesuai.
                            </p>
                        </div>
                    </motion.div>

                    {/* Kualifikasi Pelatih */}
                    <motion.div className="flex items-start" variants={titleVariants} custom={1}>
                        <FaUserCheck className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-lg lg:text-xl font-semibold text-green-700">
                                Kualifikasi Pelatih
                            </h2>
                            <p className="text-gray-700 text-justify">
                                Tim pelatih kami memiliki kualifikasi tinggi dan pengalaman bertahun-tahun
                                untuk membantu Anda mencapai tujuan kebugaran Anda.
                            </p>
                        </div>
                    </motion.div>

                    {/* Video Tutorial */}
                    <motion.div className="flex items-start" variants={titleVariants} custom={2}>
                        <FaVideo className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-lg lg:text-xl font-semibold text-green-700">
                                Video Tutorial
                            </h2>
                            <p className="text-gray-700 text-justify">
                                Kami menyediakan video tutorial untuk tontonan Anda yang mungkin dapat
                                membantu Anda dalam melakukan aktivitas kebugaran jasmani yang Anda inginkan.
                            </p>
                        </div>
                    </motion.div>

                    {/* Jam Operasional */}
                    <motion.div className="flex items-start" variants={titleVariants} custom={3}>
                        <FaClock className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-lg lg:text-xl font-semibold text-green-700">
                                Jam Operasional
                            </h2>
                            <p className="text-gray-700 text-justify">
                                Kami buka dari jam 6 pagi hingga 10 malam setiap hari, sehingga Anda bisa
                                berlatih kapan saja sesuai dengan jadwal Anda.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default About;
