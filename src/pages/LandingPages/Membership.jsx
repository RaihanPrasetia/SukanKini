import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthModal from '../../components/Modals'; // Import your AuthModal component

export default function Membership() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState("registerMitra"); // Track the current form

    const plans = [
        { id: 1, duration: '1 Bulan', price: 'Rp149.000', discount: '20%', popular: false, bestValue: false },
        { id: 2, duration: '6 Bulan', price: 'Rp320.000', discount: '20%', popular: false, bestValue: false },
        { id: 3, duration: '12 Bulan', price: 'Rp275.000', discount: '32%', popular: true, bestValue: false },
        { id: 4, duration: '18 Bulan', price: 'Rp259.000', discount: '36%', popular: true, bestValue: false },
        { id: 5, duration: '3 Bulan', price: 'Rp249.000', discount: '38%', popular: false, bestValue: true },
        { id: 6, duration: '3 Bulan', price: 'Rp385.000', discount: '10%', popular: false, bestValue: true },
    ];

    const [planIndex, setPlanIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlanIndex((prevIndex) => (prevIndex + 2) % plans.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [plans.length]);

    // Modified function to open the AuthModal and set the form to "registerMitra"
    const openAuthModal = () => {
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setCurrentForm("default"); // Reset the form to default when the modal is closed
    };

    return (
        <div className="p-8 md:p-8 flex flex-col lg:flex-row justify-center items-center">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-500">
                    Bergabunglah Sebagai Mitra dan Nikmati Keuntungannya!
                </h2>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md inline-flex items-center">
                    <ul className="text-green-700 list-disc pl-4">
                        <li className="text-left">
                            Buat Kelas Sendiri dan Raih Lebih Banyak Keanggotaan!
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid gap-2 lg:gap-5 md:grid-cols-2 grid-cols-1 w-full lg:grid-cols-2 lg:w-full">
                {plans.slice(planIndex, planIndex + 2).map((plan, id) => (
                    <motion.div
                        key={`${plan.id}-${planIndex}`}
                        className="bg-white rounded-lg shadow-lg p-4 relative lg:w-full h-48 flex flex-col justify-between"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: 'easeInOut', delay: id * 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {plan.duration}
                            </span>
                            <span className="text-red-500 font-bold">{plan.discount}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold text-gray-800">{plan.price}</p>
                                <p className="text-xs text-gray-600">per bulan</p>
                            </div>
                            {plan.popular && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}
                            {plan.bestValue && (
                                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                    Best Value
                                </span>
                            )}
                        </div>
                        <button
                            onClick={openAuthModal}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-full transition duration-300 transform hover:scale-105"
                        >
                            Daftar Sekarang
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Auth Modal */}
            {isAuthModalOpen && (
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={closeAuthModal}
                    currentForm={currentForm} // Pass the current form state to the modal
                />
            )}
        </div>
    );
}
