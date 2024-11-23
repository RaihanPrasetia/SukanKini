import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaUsersCog, FaMoneyBillWave, FaVideo } from 'react-icons/fa';

export default function AdminDashboard() {
  const stats = [
    {
      color: "bg-gradient-to-tr from-green-400 to-green-600",
      icon: <FaUsers className="text-white text-5xl" />,
      title: "Jumlah Member",
      stat: "120",
    },
    {
      color: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
      icon: <FaChalkboardTeacher className="text-white text-5xl" />,
      title: "Jumlah Kelas",
      stat: "15",
    },
    {
      color: "bg-gradient-to-tr from-cyan-400 to-cyan-600",
      icon: <FaUsersCog className="text-white text-5xl" />,
      title: "Jumlah Komunitas",
      stat: "8",
    },
    {
      color: "bg-gradient-to-tr from-indigo-400 to-indigo-700",
      icon: <FaMoneyBillWave className="text-white text-5xl" />,
      title: "Penghasilan",
      stat: "Rp 5.000.000",
    },
    {
      color: "bg-gradient-to-tr from-purple-400 to-purple-600",
      icon: <FaVideo className="text-white text-5xl" />,
      title: "Jumlah Video",
      stat: "45",
    },
  ];

  return (
    <main className="flex-1 p-8 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Statistik Anda</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-center mb-4">{stat.icon}</div>
            <div className="text-4xl font-bold text-white text-center">{stat.stat}</div>
            <div className="text-lg text-white text-center">{stat.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
