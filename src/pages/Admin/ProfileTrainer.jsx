import React, { useEffect, useState } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import adminTrainerService from '../../service/admin/adminTrainerService';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai';

export default function ProfileTrainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Untuk menyimpan data trainer yang dipilih

  useEffect(() => {
    const fetchAdminTrainer = async () => {
      setLoading(true);
      try {
        const trainerData = await adminTrainerService.getAdminTrainer();
        setTrainerData(trainerData);
        console.log(trainerData); // Assign fetched data to trainerData state
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Gagal mengambil data trainer.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminTrainer();
  }, []);

  const filteredTrainers = trainerData.filter((trainer) => {
    const query = searchQuery.toLowerCase(); // Normalisasi query ke lowercase
    return (
      (trainer.name && trainer.name.toLowerCase().includes(query)) ||
      (trainer.phone && trainer.phone.toLowerCase().includes(query)) ||
      (trainer.age && trainer.age.toString().includes(query)) || // Konversi age ke string untuk pencarian
      (trainer.alamat && trainer.alamat.toLowerCase().includes(query))
    );
  });


  const handleViewDetail = (trainer) => {
    setSelectedTrainer(trainer); // Simpan data trainer yang dipilih
  };

  const handleCloseModal = () => {
    setSelectedTrainer(null); // Tutup modal
  };

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
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-4">No</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">No. Telepon</th>
                  <th className="p-4">Alamat</th>
                  <th className="p-4">Umur</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredTrainers.length > 0 ? (
                  filteredTrainers.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        } hover:bg-gray-200`}
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.phone}</td>
                      <td className="p-4">{item.alamat}</td>
                      <td className="p-4">{item.age} Tahun</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="bg-indigo-500 text-white px-3 py-1 rounded-lg shadow hover:bg-indigo-600 transition duration-300"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Tidak ada data trainer yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal Detail Trainer */}
          {selectedTrainer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Detail Trainer</h2>
                  <button onClick={handleCloseModal}
                    className=" text-red-500 bg-red-200 p-3 rounded-full shadow-lg hover:bg-gray-200 hover:rotate-45 hover:scale-110 transition-all focus:outline-none">
                    <AiOutlineClose size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col items-center space-y-2">
                    <strong>Foto Profil</strong>
                    <img
                      src={
                        selectedTrainer.imagePath
                          ? `/images/trainer/${selectedTrainer.imagePath}`
                          : '/images/default-profile.png'
                      }
                      alt="Foto Profil"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                  <p>
                    <strong>Nama:</strong> {selectedTrainer.name}
                  </p>
                  <p>
                    <strong>No Telepon:</strong>{' '}
                    {selectedTrainer.phone || 'Tidak ada nomor telepon'}
                  </p>
                  <p>
                    <strong>Alamat:</strong>{' '}
                    {selectedTrainer.alamat || 'Alamat tidak tersedia'}
                  </p>
                  <p>
                    <strong>Umur:</strong> {selectedTrainer.age} Tahun
                  </p>

                  {/* Tampilkan informasi kelas */}
                  <div>
                    <strong>Kelas yang Latih:</strong>
                    {selectedTrainer.classes.length > 0 ? (
                      <ul className="list-disc ml-5 mt-2">
                        {selectedTrainer.classes.map((cls, index) => (
                          <li key={index}>
                            <span>{cls.name}</span> - <span>{cls.alamat}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-2">Tidak ada kelas yang diampu</p>
                    )}
                  </div>

                  {/* Tampilkan informasi owner */}
                  <div className="mt-4">
                    <strong>Informasi Pemilik (Owner):</strong>
                    <p>
                      <strong>Nama:</strong> {selectedTrainer.owner?.name || 'Tidak ada'}
                    </p>
                    <p>
                      <strong>No Telepon:</strong>{' '}
                      {selectedTrainer.owner?.phone || 'Tidak ada nomor telepon'}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      {selectedTrainer.owner?.email || 'Tidak ada email'}
                    </p>
                    <p>
                      <strong>Alamat:</strong>{' '}
                      {selectedTrainer.owner?.alamat || 'Alamat tidak tersedia'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
