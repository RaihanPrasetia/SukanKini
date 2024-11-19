import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

function Komunitas() {
    const ref = useRef(null);
    const controls = useAnimation();

    // Check if the component is in view using IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('animate');
                } else {
                    controls.start('initial');
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls]);

    // Smooth fade-in and scale effect
    const fadeInSmooth = {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
    };

    const textVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: 'easeInOut', delay: 0.2 },
    };

    return (
        <div id="komunitas" ref={ref} className="w-full flex flex-col justify-center items-center lg:py-20 py-16 px-4 lg:px-20">
            {/* Header Section */}
            <motion.div
                className="flex flex-col w-full space-y-8"
                initial="initial"
                animate={controls}
                variants={fadeInSmooth}
            >
                <div className="text-center">
                    <motion.h1 className="text-3xl lg:text-4xl font-bold text-green-600" variants={textVariants}>
                        Temukan Komunitas yang Anda Minati
                    </motion.h1>
                    <motion.p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto" variants={textVariants}>
                        Mulailah berinteraksi bersama komunitas yang sesuai dengan diri Anda! Ciptakan pengalaman seru dalam perjalanan aktivitas produktif Anda!
                    </motion.p>
                </div>

                {/* Category Tabs */}
                <div className="text-center">
                    <motion.h2 className="text-2xl font-semibold text-green-600" variants={textVariants}>
                        Kategori Komunitas
                    </motion.h2>
                    <div className="flex flex-wrap justify-center mt-6">
                        {['Pembentukan Otot', 'Atletik', 'Cardio', 'Yoga & Flexibilitas', 'Relaksasi'].map((category) => (
                            <motion.button
                                key={category}
                                className="mr-4 mb-4 px-5 py-2 border border-green-500 text-green-700 rounded-lg shadow-md transition-transform duration-200 hover:bg-green-500 hover:text-white hover:shadow-xl transform hover:scale-105"
                                variants={textVariants}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Community Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {[
                        { src: "/assets/images/kelasuser/otot.jpg", title: "Komunitas Pembentukan Otot" },
                        { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Komunitas Atletik" },
                        { src: "/assets/images/kelasuser/cardio.jpg", title: "Komunitas Cardio" },
                        { src: "/assets/images/kelasuser/zumba toning.jpg", title: "Komunitas Yoga & Flexibilitas" },
                    ].map((community, index) => (
                        <motion.div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                            variants={fadeInSmooth}
                            transition={{ delay: index * 0.2 }}
                        >
                            <img
                                src={community.src}
                                alt={community.title}
                                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-all duration-300 rounded-lg"></div>
                            <motion.p
                                className="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                variants={textVariants}
                            >
                                {community.title}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to={'#'} className="text-xl bg-green-500 py-3 px-6 rounded-xl text-white font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600">
                        Semua Komunitas
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Komunitas;
