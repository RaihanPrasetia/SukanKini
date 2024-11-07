import React from "react";
import {
    FaUsers,
    FaChalkboardTeacher,
    FaMoneyBillWave,
    FaUsersCog,
    FaVideo,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";

export default function HomeMitra({ sidebarOpen }) {
    return (
        <div
            className={`flex flex-col bg-gray-100 items-start justify-start px-4 sm:px-16 py-10 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
                }`}
        >
            {/* Background Overlay */}
            <div className="flex flex-col w-full bg-green-500 rounded-lg shadow-lg p-6">
                <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                    Hi! Selamat datang kembali di dashboard Sukankini,
                    Kami senang Anda siap membuka kelas baru.
                    Mari ciptakan pengalaman kebugaran yang inspiratif bersama!
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-5 justify-between w-full mt-8">
                {/* Stats Section */}
                <div className="w-full sm:w-full p-6 rounded-2xl bg-opacity-75 shadow-lg border border-gray-300 bg-white text-white">
                    <h2 className="text-2xl font-semibold mb-4 text-green-500">Statistik Anda</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                        {/* Stat 3 - Penghasilan */}
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

                {/* Action Buttons Section */}
                <div className="w-full sm:w-1/3 p-6 rounded-2xl bg-opacity-75 bg-gray-800 text-white">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Kelas yang Sedang Berjalan Hari Ini</h2>
                    <div className="flex flex-col space-y-4">
                        {/* Class 1 */}
                        <div className="p-4 bg-green-500 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">Yoga Pagi - 07:00 AM</h3>
                            <p className="text-sm">Instruktur: Budi Santoso</p>
                        </div>

                        {/* Class 2 */}
                        <div className="p-4 bg-yellow-500 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">HIIT Training - 10:00 AM</h3>
                            <p className="text-sm">Instruktur: Siti Aminah</p>
                        </div>

                        {/* Class 3 */}
                        <div className="p-4 bg-indigo-700 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">Pilates - 05:00 PM</h3>
                            <p className="text-sm">Instruktur: Rina Kartika</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
