import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Membership from './Membership';

export default function Promosi() {
    const sectionRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const currentSection = sectionRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    const promos = [
        {
            title: "Promo 1",
            description: "Dapatkan diskon hingga 50% untuk pembelian pertama Anda!",
            buttonText: "Dapatkan Sekarang",
            imageUrl: "/assets/images/promo/promo 1.png"
        },
        {
            title: "Promo 2",
            description: "Gratis membership untuk semua kelas, selama 1 bulan untuk anggota baru!",
            buttonText: "Klaim Sekarang",
            imageUrl: "/assets/images/promo/promo 2.jpeg"
        },
        {
            title: "Promo 3",
            description: "Bonus merchandise untuk pembelian paket pelatihan, dan mendaftar sebagi mitra kami.",
            buttonText: "Pesan Sekarang",
            imageUrl: "/assets/images/promo/promo 3.jpeg"
        }
    ];

    return (
        <>
            <Membership />
            <div ref={sectionRef} id="promosi" className="bg-gray-50 py-20 px-5 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-green-600">
                        Promo Spesial untuk Anda!
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Jangan lewatkan penawaran eksklusif ini, hanya untuk waktu terbatas!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {promos.map((promo, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                        >
                            <img
                                src={promo.imageUrl}
                                alt={promo.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-green-700">{promo.title}</h3>
                                <p className="text-gray-500 mt-2">
                                    {promo.description}
                                </p>
                                <button className="mt-4 bg-green-500 text-white text-lg font-semibold  px-6 py-2 rounded-xl hover:bg-green-600 transition duration-300">
                                    {promo.buttonText}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}
