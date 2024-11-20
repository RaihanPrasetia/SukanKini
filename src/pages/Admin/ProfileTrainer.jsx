import React, { useState } from 'react';
import { FaSearch, FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function ProfileTrainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trainerData, setTrainerData] = useState([
    { id: 1, name: 'Trainer A', email: 'trainerA@example.com', phone: '081234567891' },
    { id: 2, name: 'Trainer B', email: 'trainerB@example.com', phone: '081298765433' },
  ]);

  const handleAdd = () => {
    console.log('Tambah Trainer');
  };

  const handleEdit = (id) => {
    console.log('Edit Trainer dengan ID:', id);
  };

  const handleDelete = (id) => {
    console.log('Hapus Trainer dengan ID:', id);
    setTrainerData(trainerData.filter((trainer) => trainer.id !== id));
  };

  const filteredTrainers = trainerData.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
      <main className="flex-1 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Profil Trainer</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-1/3">
              <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Trainer..."
                className="p-2 pl-10 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleAdd}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition-all duration-300 flex items-center"
            >
              <FaPlusCircle className="mr-2" />
              Tambah Trainer
            </button>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-4">No</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">No. Telepon</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      } hover:bg-gray-200`}
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">{item.phone}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
      </main>
    </div>
  );
}
