import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigasi ke halaman sebelumnya
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white p-6">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-white animate__animated animate__fadeIn animate__delay-1s mb-6">
                    404
                </h1>
                <h2 className="text-3xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
                    Oops! Halaman Tidak Ditemukan 😢
                </h2>
                <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-1s">
                    Sepertinya halaman yang Anda cari sudah hilang di dunia maya. <span role="img" aria-label="sad-emoji">💨</span>
                </p>
                <button
                    onClick={handleGoBack}
                    className="bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-yellow-600 focus:outline-none"
                >
                    Kembali <span role="img" aria-label="laughing-emoji">😂</span>
                </button>
            </div>
            <div className="absolute bottom-10 text-sm text-gray-300 animate__animated animate__fadeIn animate__delay-2s">
                <p>&copy; 2024 Semua Hak Cipta Dilindungi</p>
            </div>
        </div>
    );
};

export default NotFound;
