import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import googleLogo from '../assets/images/google.png';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); 
    const [isForgotPassword, setIsForgotPassword] = useState(false); 

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsForgotPassword(false); 
    };
    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setIsForgotPassword(false); 
    }; 
    const toggleForgotPassword = () => setIsForgotPassword(!isForgotPassword); 

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <>
            <div className="relative bg-cover bg-center min-h-screen flex items-center justify-start" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 text-left text-white max-w-md sm:max-w-xl lg:max-w-2xl p-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        SELAMAT DATANG <br /> DI SUKANKINI! FITLIFE!
                    </h1>
                    <p className="text-base sm:text-lg mb-8">
                        Transformasi Hidup Produktif! Temukan inspirasi, tantangan, dan pengetahuan untuk mencapai kesehatan & kebugaran yang optimal.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                        <button onClick={openModal}
                            className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300 w-full sm:w-auto">
                            Gabung Sekarang
                        </button>

                        <button
                            className="flex items-center text-white bg-transparent border-2 border-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-800 transition duration-300 w-full sm:w-auto">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                            Putar Video
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-20">
                        <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                        <motion.div
                            className="bg-white rounded-lg w-[90%] sm:w-[70%] lg:w-[50%] mx-auto z-10 relative flex flex-col lg:flex-row overflow-hidden"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-green-600 p-8 text-white">
                                <h2 className="text-lg font-semibold mb-4">Selamat datang di perjalanan kebugaranmu!</h2>
                                <img
                                    src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="User holding a dumbbell"
                                    className="w-36 h-36 rounded-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-center w-full lg:w-2/3 p-6">
                                <h2 className="text-2xl font-bold text-green-600 mb-5 text-center">
                                    {isForgotPassword ? "Lupa Password" : (isSignUp ? "Daftar Akun Sukankini" : "Masuk ke akun Sukankini")}
                                </h2>

                                {isForgotPassword ? (
                                    <form className="flex flex-col gap-4">
                                        <div className="flex flex-col mb-4">
                                            <label className="mb-1 text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Masukkan alamat email Anda"
                                                className="border border-gray-300 p-2 rounded"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300"
                                        >
                                            Kirim Tautan Pemulihan
                                        </button>
                                        <button onClick={toggleForgotPassword} className="text-blue-500 mt-4">
                                            Kembali ke Masuk
                                        </button>
                                    </form>
                                ) : (
                                    <form className="flex flex-col gap-4">
                                        {isSignUp && (
                                            <div className="flex flex-col mb-4">
                                                <label className="mb-1 text-gray-700">Nama Lengkap</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nama Lengkap"
                                                    className="border border-gray-300 p-2 rounded"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col mb-4">
                                            <label className="mb-1 text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border border-gray-300 p-2 rounded"
                                            />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="mb-1 text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="border border-gray-300 p-2 rounded"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300"
                                        >
                                            {isSignUp ? "Daftar" : "Masuk"}
                                        </button>
                                    </form>
                                )}

                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="px-4 text-gray-500">Atau</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>
                                <button className="flex items-center justify-center text-black border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition duration-300 mb-4">
                                    <img src={googleLogo} alt="Google logo" className="w-5 h-5 mr-2" />
                                    Masuk dengan Google
                                </button>

                                <div className="text-center mt-4 text-gray-600">
                                    <p>
                                        {isSignUp ? "Sudah punya akun?" : "Pengguna baru?"}
                                        <button onClick={toggleForm} className="text-blue-500"> {isSignUp ? "Masuk disini" : "Daftar disini"}</button>
                                    </p>
                                    {!isForgotPassword && (
                                        <p>Password akun anda lupa? <button onClick={toggleForgotPassword} className="text-blue-500">klik disini</button></p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
