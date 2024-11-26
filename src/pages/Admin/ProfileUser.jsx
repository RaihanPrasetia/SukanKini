import React, { useEffect, useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import adminUserService from '../../service/admin/adminUserService';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai';

export default function ProfilUser() {
  const [userData, setUserData] = useState([]); // Initial state as an empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for data fetch
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user for modal

  useEffect(() => {
    const fetchUserMitra = async () => {
      setLoading(true);
      try {
        const userData = await adminUserService.getAdminDataUser();
        setUserData(userData);
        console.log(userData); // Assign fetched data to userData state
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Gagal mengambil data user.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserMitra();
  }, []);

  // Handle view action (set selected user for modal)
  const handleView = (id) => {
    const user = userData.find((item) => item.id === id);
    if (user) {
      setSelectedUser(user); // Set user data to state to display in modal
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedUser(null); // Close modal by setting selected user to null
  };

  // Filter user data based on search query
  const filteredMitra = userData.filter((user) =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.phone_number && user.phone_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.kota && user.kota.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.alamat && user.alamat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Profil User</h2>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Cari User..."
            className="p-2 pl-10 border rounded-lg shadow-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full border-4 border-t-4 border-indigo-500 w-16 h-16"></div>
        </div>
      )}

      {/* Tabel User */}
      {!loading && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-4">No</th>
                <th className="p-4">Nama User</th>
                <th className="p-4">Email</th>
                <th className="p-4">No. Telepon</th>
                <th className="p-4">Alamat</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMitra.map((user, index) => (
                <tr key={user.id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } hover:bg-gray-200`}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone_number || 'Nomor tidak tersedia'}</td>
                  <td className="p-4">{user.kota}, {user.alamat}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleView(user.id)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded-lg shadow hover:bg-indigo-600 transition duration-300"
                    >
                      <span>
                        <FaEye />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail User</h2>
              <button onClick={handleCloseModal}
                className=" text-red-500 bg-red-200 p-3 rounded-full shadow-lg hover:bg-gray-200 hover:rotate-45 hover:scale-110 transition-all focus:outline-none">
                <AiOutlineClose size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y4">
                <strong>Foto Profil</strong>
                {/* Cek apakah gambar ada, jika tidak tampilkan gambar default */}
                <img
                  src={selectedUser.image_path ? `/images/profile/${selectedUser.image_path}` : '/images/default-profile.png'}
                  alt="Foto Profil"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <p><strong>Nama User:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>No Telepon:</strong> {selectedUser.phone_number || 'Tidak ada nomor telepon'}</p>
              <p><strong>Alamat:</strong> {selectedUser.alamat}, {selectedUser.kota}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
