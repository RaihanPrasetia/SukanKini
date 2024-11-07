import React from "react";

const NotificationView = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white border-r border-gray-300 p-4">
        <nav className="flex flex-col gap-4">
          <a href="#profil" className="text-gray-700 hover:text-green-600">Profil</a>
          <a href="#notifikasi" className="text-green-600 font-semibold border-l-4 border-green-600 pl-2">
            Notifikasi
          </a>
          <a href="#pembayaran" className="text-gray-700 hover:text-green-600">Pembayaran</a>
          <a href="#kelas" className="text-gray-700 hover:text-green-600">Kelas Saya</a>
          <a href="#hapus-akun" className="text-gray-700 hover:text-red-600">Hapus Akun</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Apa yang anda cari?"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10H6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2m4-4l5 5M21 21l-5-5m0 0a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center p-4 bg-yellow-400 rounded-lg shadow-md mb-6">
          <img src="https://via.placeholder.com/50" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-bold text-white">Baihaqi Khaizan</h2>
            <p className="text-sm text-white">Jambi, Indonesia</p>
          </div>
          <button className="ml-auto bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700">Edit Profil</button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-4">
          {["Kunjungi halaman jadwal kami untuk melihat kelas terbaru dan waktu latihan!",
            "Tetap terhubung! Ikuti kami di media sosial untuk tips kebugaran dan update terbaru.",
            "Pembayaran Berhasil! Kelas yang kamu pilih telah dikonfirmasi. Siap untuk memulai perjalanan kebugaranmu!",
            "Akses lebih dari 5 kelas berbeda! Segera daftarkan diri Anda dan mulai perjalanan kebugaran Anda.",
            "Selamat datang di komunitas kebugaran kami! Temukan kelas dan program yang tepat untuk Anda."]
            .map((message, index) => (
              <div key={index} className="py-2 border-b last:border-b-0 text-gray-700">
                {message}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationView;
