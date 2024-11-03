import React, { useState } from 'react';
import '../index.css';

const Membership = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const plans = [
        { duration: '3 Bulan', price: 'Rp385.000', discount: '10%', popular: false, bestValue: false },
        { duration: '6 Bulan', price: 'Rp320.000', discount: '20%', popular: false, bestValue: false },
        { duration: '12 Bulan', price: 'Rp275.000', discount: '32%', popular: true, bestValue: false },
        { duration: '18 Bulan', price: 'Rp259.000', discount: '36%', popular: false, bestValue: false },
        { duration: '3 Bulan', price: 'Rp249.000', discount: '38%', popular: false, bestValue: true },
    ];

    const openModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPlan(null), 300);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-600 to-gray-100 p-4 md:p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Dengan satu keanggotaan, berbagai fasilitas tanpa batas!</h2>
                <p className="text-white mt-2">Nikmati semua yang kami tawarkan.</p>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md inline-flex items-center">
                    <ul className="text-green-700 list-disc pl-4">
                        <li>Nikmati akses ke lebih dari 80 klub di lebih dari 18 kota di Indonesia.</li>
                        <li>Peralatan gym berkualitas tinggi dan beragam tersedia untuk Anda.</li>
                        <li>Partisipasi dalam lebih dari 40 jenis kelas tanpa biaya tambahan.</li>
                    </ul>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative">
                        {plan.popular && (
                            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                Most Popular
                            </span>
                        )}
                        {plan.bestValue && (
                            <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                Best Value
                            </span>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {plan.duration}
                            </span>
                            <span className="text-red-500 font-bold">{plan.discount}</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl font-bold text-gray-800">{plan.price}</p>
                            <p className="text-sm text-gray-600">per bulan</p>
                        </div>
                        <button
                            onClick={() => openModal(plan)}
                            className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                        >
                            Daftar Sekarang
                        </button>
                    </div>
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
};

export default Membership;
