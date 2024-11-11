import React, { useState } from "react";
import {
    FaUsers,
    FaChalkboardTeacher,
    FaMoneyBillWave,
    FaUsersCog,
    FaVideo,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function HomeMitra({ sidebarOpen }) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [isClassActive, setIsClassActive] = useState(false);
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); // New state for tracking payment status

    const promos = [
        { id: 1, name: "Promo A", price: 100000 },
        { id: 2, name: "Promo B", price: 150000 },
        { id: 3, name: "Promo C", price: 200000 },
    ];

    const bankInfo = {
        bankName: "Bank BCA",
        accountNumber: "1234567890",
        accountHolder: "PT Sukankini",
    };

    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);

    const handlePromoChange = (promo) => {
        setSelectedPromo(promo);
    };

    const handleFileUpload = (e) => {
        setPaymentProof(e.target.files[0]);
    };

    const handlePaymentSubmit = () => {
        if (!selectedPromo || !paymentProof) {
            Swal.fire({
                title: "Perhatian",
                text: "Silakan pilih promo dan unggah bukti pembayaran.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        Swal.fire({
            title: "Pembayaran Dikonfirmasi",
            text: `Pembayaran untuk ${selectedPromo.name} berhasil dengan total Rp. ${selectedPromo.price}.`,
            icon: "success",
            confirmButtonText: "OK",
        });
        setIsClassActive(true);
        setIsPaymentCompleted(true); // Update payment status
        closePaymentModal();
    };

    return (
        <div
            className={`flex flex-col bg-gray-100 items-start justify-start px-4 sm:p-16 py-24 lg:pt-32 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
                }`}
        >
            {/* Background Overlay */}
            {!isPaymentCompleted ? (
                <div className="flex flex-col w-full bg-red-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Untuk melanjutkan, silakan lakukan pembayaran terlebih dahulu dengan memilih promo yang tersedia.
                    </h1>
                </div>
            ) : (
                <div className="flex flex-col w-full bg-green-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Hi! Selamat datang kembali di dashboard Sukankini, Kami senang Anda siap membuka kelas baru. Mari ciptakan pengalaman kebugaran yang inspiratif bersama!
                    </h1>
                </div>
            )}

            {/* Promo Cards */}
            {!isPaymentCompleted && (
                <div className="w-full sm:w-1/3 lg:w-max p-6 rounded-2xl bg-opacity-75 bg-white text-white shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-black">Promo</h2>
                    <div className="flex gap-4">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className={`cursor-pointer p-4 rounded-lg shadow-lg ${selectedPromo?.id === promo.id ? "bg-green-500" : "bg-gray-700"}`}
                                onClick={() => handlePromoChange(promo)}
                            >
                                <h3 className="text-lg font-semibold">{promo.name}</h3>
                                <p className="text-sm">Harga: Rp. {promo.price}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={openPaymentModal} className="mt-4 bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600 transition font-medium">
                        Lanjutkan Pembayaran
                    </button>
                </div>
            )}

            {isClassActive && (
                <div className="flex flex-col-reverse gap-4 sm:flex-row space-y-6 sm:space-y-0 sm:space-x-5 justify-between w-full mt-8">
                    <div className="w-full sm:w-2/3 lg:w-3/4 p-6 rounded-2xl bg-opacity-75 shadow-lg border border-gray-300 bg-white text-white">
                        <h2 className="text-2xl font-semibold mb-4 text-green-500">Statistik Anda</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {/* Stat 1 - Jumlah Member */}
                            <div className="flex flex-col items-center bg-green-500 p-6 rounded-lg shadow-lg">
                                <FaUsers className="text-4xl mb-2 text-white" />
                                <div className="text-4xl font-bold text-white">120</div>
                                <div className="text-2xl text-white">Jumlah Member</div>
                            </div>

                            {/* Stat 2 - Jumlah Kelas */}
                            <div className="flex flex-col items-center bg-yellow-500 p-6 rounded-lg shadow-lg">
                                <FaChalkboardTeacher className="text-4xl mb-2 text-white" />
                                <div className="text-4xl font-bold text-white">15</div>
                                <div className="text-2xl text-white">Jumlah Kelas</div>
                            </div>

                            {/* Stat 3 - Jumlah Komunitas */}
                            <div className="flex flex-col items-center bg-cyan-500 p-6 rounded-lg shadow-lg">
                                <FaUsersCog className="text-4xl mb-2" />
                                <div className="text-4xl font-bold">8</div>
                                <div className="text-2xl">Jumlah Komunitas</div>
                            </div>

                            {/* Stat 4 - Penghasilan */}
                            <div className="flex flex-col items-center bg-indigo-700 p-6 rounded-lg shadow-lg">
                                <FaMoneyBillWave className="text-4xl mb-2" />
                                <div className="text-4xl font-bold">Rp 5.000.000</div>
                                <div className="text-2xl">Penghasilan</div>
                            </div>

                            {/* Stat 5 - Jumlah Video */}
                            <div className="flex flex-col items-center justify-center bg-violet-500 p-6 rounded-lg shadow-lg">
                                <FaVideo className="text-4xl mb-2" />
                                <div className="text-4xl font-bold">45</div>
                                <div className="text-2xl">Jumlah Video</div>
                            </div>

                            {/* Stat 6 - Status Pembayaran */}
                            <div className="flex flex-col bg-red-500 p-6 rounded-lg shadow-lg">
                                <div className="font-semibold text-center text-2xl">Status Pembayaran</div>
                                {/* Payment Status List */}
                                <div className="flex flex-col items-center mt-4 space-y-2">
                                    <div className="py-3 px-4 bg-yellow-500 space-x-2 text-white rounded-full text-xl font-medium flex items-center justify-center">
                                        <FaSpinner className="text-white text-3xl" />
                                        <span>Diproses</span>
                                        <span className="bg-white text-yellow-500 p-1 rounded-full">25</span>
                                    </div>
                                    <div className="py-3 px-4 bg-green-500 space-x-2 text-white rounded-full text-xl font-medium flex items-center justify-center">
                                        <FaCheckCircle className="text-white text-3xl" />
                                        <span>Disetujui</span>
                                        <span className="bg-white text-green-500 p-1 rounded-full">120</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 lg:w-1/4 p-6 rounded-2xl bg-opacity-75 bg-gray-800 text-white mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Kelas yang Sedang Berjalan Hari Ini</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="p-4 bg-green-500 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold">Yoga Pagi - 07:00 AM</h3>
                                <p className="text-sm">Instruktur: Budi Santoso</p>
                            </div>
                            <div className="p-4 bg-yellow-500 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold">HIIT Training - 10:00 AM</h3>
                                <p className="text-sm">Instruktur: Siti Aminah</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Class in Progress */}


            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-semibold text-center mb-6">Pembayaran</h2>
                        <p className="text-lg mb-4">
                            Silakan transfer pembayaran sesuai dengan informasi rekening di bawah ini dan unggah bukti pembayaran
                            di bawah.
                        </p>
                        <div className="mb-6">
                            {/* Informasi Promo */}
                            {selectedPromo && (
                                <div className="mb-4">
                                    <h3 className="font-semibold">Total Pembayaran:</h3>
                                    <p className="text-xl font-bold">Rp. {selectedPromo.price}</p>
                                </div>
                            )}

                            {/* Informasi Rekening */}
                            <div className="mb-4">
                                <h3 className="font-semibold">Informasi Rekening:</h3>
                                <p>Bank: {bankInfo.bankName}</p>
                                <p>No. Rekening: {bankInfo.accountNumber}</p>
                                <p>Atas Nama: {bankInfo.accountHolder}</p>
                            </div>

                            {/* Unggah Bukti Pembayaran */}
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="block w-full p-2 border border-gray-300 rounded-md mb-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={closePaymentModal}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                            >
                                Kirim Bukti Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
