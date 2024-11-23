import React, { useState } from 'react';

export default function DataKelas() {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredClasses = classData.filter((kelas) =>
    selectedCategory === 'All' ? true : kelas.category === selectedCategory
  );

  return (
    <main className="flex-1 space-y-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Jumlah Kelas</h2>

      {/* Filter Kategori */}
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
            {filteredClasses.length > 0 ? (
              filteredClasses.map((kelas, index) => (
                <tr
                  key={kelas.id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } hover:bg-gray-200`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{kelas.name}</td>
                  <td className="p-4">{kelas.category}</td>
                  <td className="p-4">{kelas.participants}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${kelas.status === 'Aktif'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {kelas.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Tidak ada kelas yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>

  );
}
