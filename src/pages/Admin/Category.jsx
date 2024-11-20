import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaUserAlt, FaBox, FaMoneyBillAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';

const JumlahKelas = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredClasses = classData.filter((kelas) =>
    selectedCategory === 'All' ? true : kelas.category === selectedCategory
  );

  const sidebarItems = [
    { label: 'Dashboard', icon: '📄', page: 'dashboard' },
    { label: 'Profil Mitra', icon: '👥', page: 'profilMitra' },
    { label: 'Profil User', icon: '👤', page: 'profilUser' },
    { label: 'Profil Trainer', icon: '🎓', page: 'profilTrainer' },
    { label: 'Category', icon: '📦' },
    { label: 'Pembayaran', icon: '💰', page: 'pembayaran' },
    { label: 'Logout', icon: '🚪', page: 'logout' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-r-2xl flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Avatar"
          className="rounded-full border-4 border-white mb-4"
          style={{ width: '75px', height: '75px' }}
        />
        <h2 className="text-2xl font-bold text-white">Tegar</h2>
        <p className="text-gray-200 mb-6">Admin</p>
        <nav className="w-full space-y-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center text-white px-4 py-3 text-lg hover:bg-indigo-700 hover:text-gray-300 rounded-lg transition-all duration-300 ease-in-out"
            >
              <span className="mr-3 text-xl">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Jumlah Kelas</h2>

        {/* Filter Category */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border rounded-lg shadow-sm w-1/3 text-gray-700"
          >
            <option value="All">Semua Kategori</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Desain">Desain</option>
            <option value="Bahasa">Bahasa</option>
          </select>
        </div>

        {/* Tabel Jumlah Kelas */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-4">No</th>
                <th className="p-4">Nama Kelas</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Jumlah Peserta</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((kelas, index) => (
                <tr
                  key={kelas.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{kelas.name}</td>
                  <td className="p-4">{kelas.category}</td>
                  <td className="p-4">{kelas.participants}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${kelas.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {kelas.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const classData = [
  {
    id: 1,
    name: 'Belajar React',
    category: 'Teknologi',
    participants: 30,
    status: 'Aktif',
  },
  {
    id: 2,
    name: 'Manajemen Proyek',
    category: 'Bisnis',
    participants: 25,
    status: 'Aktif',
  },
  {
    id: 3,
    name: 'Desain UI/UX',
    category: 'Desain',
    participants: 18,
    status: 'Tidak Aktif',
  },
  {
    id: 4,
    name: 'Bahasa Inggris Dasar',
    category: 'Bahasa',
    participants: 40,
    status: 'Aktif',
  },
  {
    id: 5,
    name: 'Machine Learning Pemula',
    category: 'Teknologi',
    participants: 35,
    status: 'Aktif',
  },
];

export default JumlahKelas;
