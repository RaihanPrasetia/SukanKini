import React from "react";
import { motion } from "framer-motion";
import Membership from "./Membership";

export default function Promosi() {
    return (
        <>
            <Membership />

            <div className="bg-gray-50 py-20 px-5 lg:px-20">
                <div className="">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
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
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {/* Promotion Cards */}
                        {["Promo 1", "Promo 2", "Promo 3"].map((promo, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                            >
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt={promo}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-green-700">{promo}</h3>
                                    <p className="text-gray-500 mt-2">
                                        {index === 0 && "Dapatkan diskon hingga 50% untuk pembelian pertama Anda!"}
                                        {index === 1 && "Free membership selama 1 bulan untuk anggota baru!"}
                                        {index === 2 && "Bonus merchandise untuk pembelian paket pelatihan."}
                                    </p>
                                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition duration-300">
                                        {index === 0 && "Dapatkan Sekarang"}
                                        {index === 1 && "Klaim Sekarang"}
                                        {index === 2 && "Pesan Sekarang"}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
