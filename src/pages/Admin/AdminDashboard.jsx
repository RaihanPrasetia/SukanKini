import React, { useEffect, useState } from 'react';
import { FaUsers, FaChalkboardTeacher, FaMoneyBillWave, FaVideo } from 'react-icons/fa';
import adminDashboardService from '../../service/admin/adminDashboard';
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const [countData, setCountData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountData = async () => {
      setLoading(true);
      try {
        const data = await adminDashboardService.getDashboardCount();
        setCountData(data);
      } catch (error) {
        Swal.fire({
          title: 'Upss!!!',
          text: error.message || 'Gagal mengambil data statistik.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error("Error fetching dashboard data:", error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchCountData();
  }, []);

  const stats = countData
    ? [
      {
        color: "bg-gradient-to-tr from-green-400 to-green-600",
        icon: <FaUsers className="text-white text-5xl" />,
        title: "Jumlah User",
        stat: countData.countDataUser || 0,
      },
      {
        color: "bg-gradient-to-tr from-blue-400 to-blue-600",
        icon: <FaUsers className="text-white text-5xl" />,
        title: "Jumlah Mitra",
        stat: countData.countDataMitra || 0,
      },
      {
        color: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
        icon: <FaChalkboardTeacher className="text-white text-5xl" />,
        title: "Jumlah Kelas",
        stat: countData.countDataClass || 0,
      },
      {
        color: "bg-gradient-to-tr from-indigo-400 to-indigo-700",
        icon: <FaMoneyBillWave className="text-white text-5xl" />,
        title: "Penghasilan",
        stat: `Rp ${countData.countTotal?.toLocaleString('id-ID') || 0}`,
      },
      {
        color: "bg-gradient-to-tr from-purple-400 to-purple-600",
        icon: <FaVideo className="text-white text-5xl" />,
        title: "Jumlah Video",
        stat: 0, // Belum ada data video dalam response
      },
    ]
    : [];

  return (
    <main className="flex-1 p-8 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Statistik Anda</h2>
      {loading ? (
        <div className="text-center text-gray-600">Memuat data statistik...</div>
      ) : (
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
      )}
    </main>
  );
}
