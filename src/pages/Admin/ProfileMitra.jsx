import React, { useEffect, useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import adminUserService from '../../service/admin/adminUserService';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai';

export default function ProfilMitra() {
  const [mitraData, setMitraData] = useState([]); // Initial state as an empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for data fetch
  const [selectedMitra, setSelectedMitra] = useState(null); // State to hold selected mitra for modal

  useEffect(() => {
    const fetchUserMitra = async () => {
      setLoading(true);
      try {
        const mitraData = await adminUserService.getAdminDataMitra();
        setMitraData(mitraData);
        console.log(mitraData) // Assign fetched data to mitraData state
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Gagal mengambil data mitra.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserMitra();
  }, []);

  // Handle view action (set selected mitra for modal)
  const handleView = (id) => {
    const mitra = mitraData.find((item) => item.id === id);
    if (mitra) {
      setSelectedMitra(mitra); // Set mitra data to state to display in modal
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedMitra(null); // Close modal by setting selected mitra to null
  };

  // Filter mitra data based on search query
  const filteredMitra = mitraData.filter((mitra) =>
    (mitra.name && mitra.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (mitra.phone_number && mitra.phone_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (mitra.email && mitra.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (mitra.kota && mitra.kota.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (mitra.alamat && mitra.alamat.toLowerCase().includes(searchQuery.toLowerCase()))
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
      </div>

      {/* Tabel Mitra */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="p-4">No</th>
              <th className="p-4">Nama Mitra</th>
              <th className="p-4">Email</th>
              <th className="p-4">No. Telepon</th>
              <th className="p-4">Alamat</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMitra.map((mitra, index) => (
              <tr key={mitra.id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{mitra.name}</td>
                <td className="p-4">{mitra.email}</td>
                <td className="p-4">
                  {mitra.phone_number ? (
                    mitra.phone_number
                  ) : (
                    <span className="text-red-500">Nomor tidak tersedia</span>
                  )}
                </td>
                <td className="p-4">{mitra.kota}, {mitra.alamat}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleView(mitra.id)}
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

      {selectedMitra && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail Mitra</h2>
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
                  src={selectedMitra.image_path ? `/images/${selectedMitra.image_path}` : '/images/default-profile.png'}
                  alt="Foto Profil"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <p><strong>Nama Mitra:</strong> {selectedMitra.name}</p>
              <p><strong>Email:</strong> {selectedMitra.email}</p>
              <p><strong>No Telepon:</strong> {selectedMitra.phone_number || 'Tidak ada nomor telepon'}</p>
              <p><strong>Alamat:</strong> {selectedMitra.alamat}, {selectedMitra.kota}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
