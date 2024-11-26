import React, { useEffect, useState } from 'react';
import adminClassService from '../../service/admin/adminClassService'; // Pastikan ini adalah layanan API yang benar
import { AiOutlineClose } from 'react-icons/ai';

export default function DataKelas() {
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchAdminClass = async () => {
      setLoading(true);
      try {
        const classData = await adminClassService.getAdminClasses();
        setClassData(classData);
      } catch (error) {
        console.error("Gagal mengambil data kelas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminClass();
  }, []);

  const openModal = (kelas) => {
    setSelectedClass(kelas);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  return (
    <main className="flex-1 space-y-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Jumlah Kelas</h2>

      {/* Tabel Jumlah Kelas */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="p-4">No</th>
              <th className="p-4 text-left">Nama Kelas</th>
              <th className="p-4 text-left">Pemilik</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Jumlah Peserta</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">Loading...</td>
              </tr>
            ) : classData.length > 0 ? (
              classData.map((classes, index) => (
                <tr
                  key={classes.id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 text-left">{classes.name}</td>
                  <td className="p-4 text-left">{classes.owner.name}</td>
                  <td className="p-4 text-center">{classes.category?.name}</td>
                  <td className="p-4">
                    {classes.members?.length === 0 ? (
                      <span className="text-gray-500">Belum ada peserta</span>
                    ) : (
                      classes.members?.length
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {classes.deletedAt === null ? (
                      <span className="bg-green-500 text-white px-4 py-2 rounded-lg  hover:bg-green-600 transition-all duration-200">Aktif</span>
                    ) : (
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200">Tidak Aktif</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openModal(classes)} // Mengklik untuk membuka modal
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  Tidak ada kelas yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal untuk menampilkan detail kelas */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 w-1/2 rounded-lg ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Detail Kelas</h2>
              <button onClick={closeModal}
                className=" text-red-500 bg-red-200 p-3 rounded-full shadow-lg hover:bg-gray-200 hover:rotate-45 hover:scale-110 transition-all focus:outline-none">
                <AiOutlineClose size={18} />
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-4">{selectedClass.name}</h3>
            <div className="mb-4">
              <strong>Alamat: </strong>{selectedClass.address}
            </div>
            <div className="mb-4">
              <strong>Kategori: </strong>{selectedClass.category?.name}
            </div>
            <div className="mb-4">
              <strong>Harga: </strong>Rp {selectedClass.price?.toLocaleString()}
            </div>
            <div className="mb-4">
              <strong>Trainer: </strong>{selectedClass.trainer?.name} (Usia: {selectedClass.trainer?.age})
            </div>
            <div className="mb-4">
              <strong>Jadwal: </strong>
              <ul>
                {selectedClass.schedules?.map((schedule, index) => (
                  <li key={index}>{schedule.hari} - {schedule.jam}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
