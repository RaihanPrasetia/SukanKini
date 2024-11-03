import React from "react";
import { motion } from "framer-motion";

export default function Promosi() {
    return (
        <div className="bg-gray-50 py-10 px-5 md:px-20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-bold text-green-600">
                        Promo Spesial untuk Anda!
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Jangan lewatkan penawaran eksklusif ini, hanya untuk waktu terbatas!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Promotion Cards */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                    >
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Promo 1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-green-700">Promo 1</h3>
                            <p className="text-gray-500 mt-2">
                                Dapatkan diskon hingga 50% untuk pembelian pertama Anda!
                            </p>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                                Dapatkan Sekarang
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                    >
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Promo 2"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-green-700">Promo 2</h3>
                            <p className="text-gray-500 mt-2">
                                Free membership selama 1 bulan untuk anggota baru!
                            </p>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                                Klaim Sekarang
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                    >
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Promo 3"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-green-700">Promo 3</h3>
                            <p className="text-gray-500 mt-2">
                                Bonus merchandise untuk pembelian paket pelatihan.
                            </p>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                                Pesan Sekarang
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
