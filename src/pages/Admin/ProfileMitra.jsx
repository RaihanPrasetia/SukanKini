import React, { useState } from 'react';
import { FaSearch, FaPlusCircle, FaEdit, FaTrashAlt, FaUserTie, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const App = () => {
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
        <ProfilMitra />
      </main>
    </div>
  );
};

const ProfilMitra = () => {
  const [mitraData, setMitraData] = useState(initialMitraData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = () => alert('Tambah Mitra belum diimplementasikan.');
  const handleEdit = (id) => alert(`Edit Mitra dengan ID: ${id}`);
  const handleDelete = (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus mitra ini?');
    if (confirmed) {
      setMitraData((prev) => prev.filter((mitra) => mitra.id !== id));
    }
  };

  const filteredMitra = mitraData.filter((mitra) =>
    mitra.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Profil Mitra</h2>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Cari Mitra..."
            className="p-2 pl-10 border rounded-lg shadow-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleAdd}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-2 hover:bg-indigo-600 transition-all duration-300"
        >
          <FaPlusCircle />
          <span>Tambah Mitra</span>
        </button>
      </div>

      {/* Tabel Mitra */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="p-4">No</th>
              <th className="p-4">Nama Mitra</th>
              <th className="p-4">Email</th>
              <th className="p-4">Alamat</th>
              <th className="p-4">No. Telepon</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMitra.map((mitra, index) => (
              <tr key={mitra.id} className="hover:bg-indigo-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{mitra.name}</td>
                <td className="p-4">{mitra.email}</td>
                <td className="p-4">{mitra.address}</td>
                <td className="p-4">{mitra.phone}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEdit(mitra.id)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(mitra.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Data Mitra Awal
const initialMitraData = [
  { id: 1, name: 'Mitra A', email: 'mitra@a.com', address: 'Alamat A', phone: '081234567890' },
  { id: 2, name: 'Mitra B', email: 'mitra@b.com', address: 'Alamat B', phone: '081234567891' },
  { id: 3, name: 'Mitra C', email: 'mitra@c.com', address: 'Alamat C', phone: '081234567892' },
];

export default App;
