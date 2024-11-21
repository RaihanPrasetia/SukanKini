import React, { useState } from 'react';
import { FaSearch, FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';


export default function ProfilMitra() {
  const initialMitraData = [
    { id: 1, name: 'Mitra A', email: 'mitra@a.com', address: 'Alamat A', phone: '081234567890' },
    { id: 2, name: 'Mitra B', email: 'mitra@b.com', address: 'Alamat B', phone: '081234567891' },
    { id: 3, name: 'Mitra C', email: 'mitra@c.com', address: 'Alamat C', phone: '081234567892' },
  ];
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

