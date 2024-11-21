import React from "react";
import { 
  MdPeople, 
  MdClass, 
  MdGroupWork, 
  MdAttachMoney, 
  MdVideocam, 
  MdHourglassEmpty, 
  MdCheckCircle 
} from "react-icons/md";

export default function HomeMitra({ sidebarOpen }) {
  return (
    <div className={`flex flex-col bg-gray-100 items-start justify-start px-4 sm:p-16 py-24 lg:pt-32 transition-all
    duration-300 ${sidebarOpen ? "ml-64" : "ml-0" }`}>
      {/* Welcome Section */}
      <div className="flex flex-col w-full bg-green-600 rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white text-left tracking-tight leading-snug">
              Hi! Selamat datang kembali di dashboard Sukankini, Kami senang Anda siap membuka kelas baru.
              Mari ciptakan pengalaman kebugaran yang inspiratif bersama!
          </h1>
      </div>

      {/* Stats and Classes Section */}
      <div className="flex flex-col-reverse gap-8 sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 justify-between w-full mt-8">
        {/* Stats Section */}
        <div className="w-full sm:w-2/3 lg:w-3/4 p-8 rounded-2xl bg-white shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">Statistik Anda</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Stat 1 - Jumlah Member */}
            <div className="flex flex-col items-center bg-green-500 p-6 rounded-xl shadow-xl">
              <MdPeople className="text-4xl mb-3 text-white" />
              <div className="text-4xl font-bold text-white">120</div>
              <div className="text-xl text-white">Jumlah Member</div>
            </div>

            {/* Stat 2 - Jumlah Kelas */}
            <div className="flex flex-col items-center bg-yellow-500 p-6 rounded-xl shadow-xl">
              <MdClass className="text-4xl mb-3 text-white" />
              <div className="text-4xl font-bold text-white">15</div>
              <div className="text-xl text-white">Jumlah Kelas</div>
            </div>

            {/* Stat 3 - Jumlah Komunitas */}
            <div className="flex flex-col items-center bg-cyan-500 p-6 rounded-xl shadow-xl">
              <MdGroupWork className="text-4xl mb-3 text-white" />
              <div className="text-4xl font-bold text-white">8</div>
              <div className="text-xl text-white">Jumlah Komunitas</div>
            </div>

            {/* Stat 4 - Penghasilan */}
            <div className="flex flex-col items-center bg-indigo-700 p-6 rounded-xl shadow-xl">
              <MdAttachMoney className="text-4xl mb-3 text-white" />
              <div className="text-4xl font-bold text-white">Rp 5.000.000</div>
              <div className="text-xl text-white">Penghasilan</div>
            </div>

            {/* Stat 5 - Jumlah Video */}
            <div className="flex flex-col items-center bg-violet-500 p-6 rounded-xl shadow-xl">
              <MdVideocam className="text-4xl mb-3 text-white" />
              <div className="text-4xl font-bold text-white">45</div>
              <div className="text-xl text-white">Jumlah Video</div>
            </div>

            {/* Stat 6 - Status Pembayaran */}
            <div className="flex flex-col bg-red-500 p-8 rounded-xl shadow-xl">
              <div className="font-semibold text-center text-2xl text-white mb-6">Status Pembayaran</div>
              {/* Payment Status List */}
              <div className="flex flex-col items-start space-y-6">
                <div className="flex items-center space-x-4 bg-yellow-500 text-white p-4 rounded-lg shadow-md w-full mb-6">
                  <MdHourglassEmpty className="text-white text-3xl animate-spin" />
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">Diproses</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-xl">25</span>
                      <span className="text-xs bg-white text-yellow-500 p-1 rounded-full">Items</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-green-500 text-white p-4 rounded-lg shadow-md w-full">
                  <MdCheckCircle className="text-white text-3xl" />
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">Disetujui</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-xl">120</span>
                      <span className="text-xs bg-white text-green-500 p-1 rounded-full">Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Current Classes Section */}
        <div className="w-full sm:w-1/3 lg:w-1/4 p-8 rounded-2xl bg-gray-800 text-white mt-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Kelas yang Sedang Berjalan Hari Ini</h2>
          <div className="flex flex-col space-y-6">
            <div className="p-6 bg-green-600 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold">Yoga Pagi - 07:00 AM</h3>
              <p className="text-sm">Instruktur: Budi Santoso</p>
            </div>
            <div className="p-6 bg-yellow-600 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold">HIIT Training - 10:00 AM</h3>
              <p className="text-sm">Instruktur: Siti Aminah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
