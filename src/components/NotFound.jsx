import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigasi ke halaman sebelumnya
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">
                Maaf, halaman yang Anda cari tidak ditemukan.
            </p>
            <button
                onClick={handleGoBack}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
            >
                Kembali
            </button>
        </div>
    );
};

export default NotFound;
