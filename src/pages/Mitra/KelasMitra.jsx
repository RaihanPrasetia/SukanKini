import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const KelasMitra = () => {
    const navigate = useNavigate();  // For navigation
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [formData, setFormData] = useState({
        namaKelas: '',
        kategori: '',
        jam: '',
        hariTanggal: '',
        alamat: ''
    });

    const classData = [
        {
            id: 1,
            namaKelas: 'Yoga for Beginners',
            kategori: 'Fitness',
            jam: '08:00 AM',
            hariTanggal: 'Senin, 12 November 2024',
            alamat: 'Jl. Merdeka No. 10, Jakarta',
        },
        {
            id: 2,
            namaKelas: 'Advanced Programming',
            kategori: 'Tech',
            jam: '10:00 AM',
            hariTanggal: 'Selasa, 13 November 2024',
            alamat: 'Jl. Teknologi No. 5, Bandung',
        },
    ];

    const handleViewDetails = (kelasId) => {
        navigate(`/mitra/kelas/${kelasId}`);  // Navigate to the class details page
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // You can handle form submission here (e.g., send to API)
        setIsModalOpen(false); // Close modal after submission
    };

    return (
        <div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Daftar Kelas</h2>
                {/* Button with Icon */}
                <button
                    className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                    onClick={handleModalOpen} // Open modal on button click
                >
                    <FaPlus className="mr-2" />
                    Buat Kelas
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed  inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white mx-6 p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Buat Kelas</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Nama Kelas</label>
                                <input
                                    type="text"
                                    name="namaKelas"
                                    value={formData.namaKelas}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Kategori</label>
                                <input
                                    type="text"
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Jam</label>
                                <input
                                    type="time"
                                    name="jam"
                                    value={formData.jam}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Hari/Tanggal</label>
                                <input
                                    type="text"
                                    name="hariTanggal"
                                    value={formData.hariTanggal}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Alamat</label>
                                <input
                                    type="text"
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={handleModalClose}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-300">Nama Kelas</th>
                            <th className="px-4 py-2 border border-gray-300">Kategori</th>
                            <th className="px-4 py-2 border border-gray-300">Jam</th>
                            <th className="px-4 py-2 border border-gray-300">Hari/Tanggal</th>
                            <th className="px-4 py-2 border border-gray-300">Alamat</th>
                            <th className="px-4 py-2 border border-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classData.map((kelas) => (
                            <tr key={kelas.id}>
                                <td className="px-4 py-2 border border-gray-300">{kelas.namaKelas}</td>
                                <td className="px-4 py-2 border border-gray-300">{kelas.kategori}</td>
                                <td className="px-4 py-2 border border-gray-300">{kelas.jam}</td>
                                <td className="px-4 py-2 border border-gray-300">{kelas.hariTanggal}</td>
                                <td className="px-4 py-2 border border-gray-300">{kelas.alamat}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        className="text-white bg-blue-500 py-2 px-6 rounded-lg hover:text-white hover:bg-blue-600"
                                        onClick={() => handleViewDetails(kelas.id)}  // On click, navigate to the details page
                                    >
                                        Lihat
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

export default KelasMitra;
