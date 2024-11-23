// App.jsx
import React, { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function ProfilUser() {

  const initialUserData = [
    {
      id: 1,
      name: 'User A',
      email: 'userA@example.com',
      phone: '081234567890',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'User B',
      email: 'userB@example.com',
      phone: '081298765432',
      role: 'Editor',
    },
    {
      id: 3,
      name: 'User C',
      email: 'userC@example.com',
      phone: '081334455667',
      role: 'Viewer',
    },
  ];

  const [userData, setUserData] = useState(initialUserData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = () => alert('Tambah User belum diimplementasikan.');
  const handleEdit = (id) => alert(`Edit User dengan ID: ${id}`);
  const handleDelete = (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus user ini?');
    if (confirmed) {
      setUserData((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Profil User</h2>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari User..."
          className="p-2 border rounded-lg shadow-sm w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition-all duration-300"
        >
          <FaPlusCircle className="inline-block mr-2" />
          Tambah User
        </button>
      </div>

      {/* Tabel User */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="p-4">No</th>
              <th className="p-4">Nama User</th>
              <th className="p-4">Email</th>
              <th className="p-4">No. Telepon</th>
              <th className="p-4">Role</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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

