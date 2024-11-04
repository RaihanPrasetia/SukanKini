<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6

export default function Membership() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [planIndex, setPlanIndex] = useState(0);

    const plans = [
        { id: 1, duration: '1 Bulan', price: 'Rp149.000', discount: '20%', popular: false, bestValue: false },
        { id: 6, duration: '3 Bulan', price: 'Rp385.000', discount: '10%', popular: false, bestValue: true },
        { id: 2, duration: '6 Bulan', price: 'Rp320.000', discount: '20%', popular: false, bestValue: false },
        { id: 3, duration: '12 Bulan', price: 'Rp275.000', discount: '32%', popular: true, bestValue: false },
        { id: 4, duration: '18 Bulan', price: 'Rp259.000', discount: '36%', popular: true, bestValue: false },
        { id: 5, duration: '3 Bulan', price: 'Rp249.000', discount: '38%', popular: false, bestValue: true },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlanIndex((prevIndex) => (prevIndex + 2) % plans.length);
        }, 3000); // Change cards every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const openModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPlan(null), 300);
    };

    return (
        <div className="p-8 md:p-8 flex flex-col lg:flex-row justify-center items-center">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-500">Bergabunglah Sebagai Mitra dan Nikmati Keuntungannya!</h2>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md inline-flex items-center">
                    <ul className="text-green-700 list-disc pl-4">
                        <li className='text-left'>Buat Kelas Sendiri dan Raih Lebih Banyak Keanggotaan!</li>
                    </ul>
                </div>
            </div>

            <div className="grid gap-2 lg:gap-5 md:grid-cols-2 grid-cols-1 w-full lg:grid-cols-2 lg:w-full ">
                {plans.slice(planIndex, planIndex + 2).map((plan, id) => (
                    <motion.div
                        key={`${plan.id}-${planIndex}`} // Use a combination of plan ID and planIndex for the key
                        className="bg-white rounded-lg shadow-lg p-4 relative lg:w-full h-48 flex flex-col justify-between"
                        initial={{ opacity: 0, x: 30 }} // Start from the right
                        animate={{ opacity: 1, x: 0 }} // Move to the original position
                        exit={{ opacity: 0, x: -30 }} // Move out to the left
                        transition={{
                            duration: 0.8,
                            delay: id * 0.3 // Adding delay based on the index of the card
                        }}
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
                            {/* Labels: "Most Popular" or "Best Value" */}
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
                            onClick={() => openModal(plan)}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 rounded-full transition duration-300"
                        >
                            Daftar Sekarang
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedPlan && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-lg shadow-lg flex flex-col w-11/12 md:w-3/4 lg:w-2/3 transform transition-all duration-300 ease-out">
                        <div className="flex flex-col md:flex-row">
                            {/* Left Section: Image and Description */}
                            <div className="w-full md:w-1/3 p-6 bg-green-100 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex flex-col items-center justify-center animate-slideInLeft">
                                <img src="https://via.placeholder.com/150" alt="Partnership" className="mb-4 rounded-lg" />
                                <p className="text-center text-green-700 font-semibold">
                                    Dapatkan Banyak Keuntungan Dengan Menjadi Mitra Kami!
                                </p>
                            </div>

                            {/* Right Section: Form */}
                            <div className="w-full md:w-2/3 p-8 relative animate-slideInRight">
                                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                    &times;
                                </button>
                                <h2 className="text-2xl font-bold mb-4">Formulir Daftar Menjadi Mitra</h2>
                                <p className="text-gray-700 mb-4">
                                    {selectedPlan.duration} - {selectedPlan.price} ({selectedPlan.discount} discount)
                                </p>
                                <form>
                                    <input type="text" placeholder="Nama Mitra" className="w-full border p-2 mb-2 rounded" />
                                    <input type="email" placeholder="Email" className="w-full border p-2 mb-2 rounded" />
                                    <input type="text" placeholder="No. Telp" className="w-full border p-2 mb-2 rounded" />
                                    <input type="text" placeholder="Nama Bank" className="w-full border p-2 mb-2 rounded" />
                                    <input type="text" placeholder="No. Rek" className="w-full border p-2 mb-2 rounded" />
                                    <input type="text" placeholder="Kota" className="w-full border p-2 mb-2 rounded" />
                                    <input type="text" placeholder="Alamat" className="w-full border p-2 mb-4 rounded" />
                                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">
                                        Lanjut Pembayaran
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
