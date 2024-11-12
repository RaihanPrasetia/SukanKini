// App.jsx
import React from 'react';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaUsersCog,
  FaVideo,
  FaSpinner,
  FaCheckCircle,
} from 'react-icons/fa';

const App = () => {
  const sidebarItems = ['Dashboard', 'Profil Karyawan', 'Pembayaran', 'Logout'];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 rounded-r-2xl flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Avatar"
          className="rounded-full border-4 border-indigo-500 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-700">Tegar</h2>
        <p className="text-gray-400 mb-6">Admin</p>
        <nav className="w-full space-y-3">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center text-gray-700 px-4 py-2 text-lg hover:bg-indigo-100 hover:text-indigo-700 rounded-lg transition-all duration-300 ease-in-out"
            >
              <span className="mr-2">📄</span> {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Statistik Anda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stat Cards */}
          <StatCard
            color="bg-gradient-to-tr from-green-400 to-green-600"
            icon={<FaUsers className="text-white text-5xl" />}
            title="Jumlah Member"
            stat="120"
          />
          <StatCard
            color="bg-gradient-to-tr from-yellow-400 to-yellow-600"
            icon={<FaChalkboardTeacher className="text-white text-5xl" />}
            title="Jumlah Kelas"
            stat="15"
          />
          <StatCard
            color="bg-gradient-to-tr from-cyan-400 to-cyan-600"
            icon={<FaUsersCog className="text-white text-5xl" />}
            title="Jumlah Komunitas"
            stat="8"
          />
          <StatCard
            color="bg-gradient-to-tr from-indigo-400 to-indigo-700"
            icon={<FaMoneyBillWave className="text-white text-5xl" />}
            title="Penghasilan"
            stat="Rp 5.000.000"
          />
          <StatCard
            color="bg-gradient-to-tr from-purple-400 to-purple-600"
            icon={<FaVideo className="text-white text-5xl" />}
            title="Jumlah Video"
            stat="45"
          />
          <PaymentStatus />
        </div>
      </main>
    </div>
  );
};

// Komponen Kartu Statistik
const StatCard = ({ color, icon, title, stat }) => (
  <div className={`${color} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <div className="text-4xl font-bold text-white text-center">{stat}</div>
    <div className="text-lg text-white text-center">{title}</div>
  </div>
);

// Komponen Status Pembayaran
const PaymentStatus = () => (
  <div className="bg-gradient-to-tr from-red-500 to-red-700 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-white text-center mb-4">Status Pembayaran</h3>
    <div className="space-y-3">
      <StatusBadge
        color="bg-yellow-500"
        icon={<FaSpinner className="text-white text-3xl" />}
        text="Diproses"
        count="25"
      />
      <StatusBadge
        color="bg-green-500"
        icon={<FaCheckCircle className="text-white text-3xl" />}
        text="Disetujui"
        count="120"
      />
    </div>
  </div>
);

// Komponen Badge Status
const StatusBadge = ({ color, icon, text, count }) => (
  <div className={`flex items-center justify-center ${color} py-3 px-4 rounded-full text-white text-lg font-semibold space-x-3`}>
    {icon}
    <span>{text}</span>
    <span className="bg-white text-gray-800 p-1 rounded-full text-sm">{count}</span>
  </div>
);

export default App;
