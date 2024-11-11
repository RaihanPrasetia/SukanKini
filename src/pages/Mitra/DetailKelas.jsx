import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

// Sample data for class details, members, and instructors
const classDetails = {
    1: {
        namaKelas: 'Yoga for Beginners',
        kategori: 'Fitness',
        jam: '08:00 AM',
        hariTanggal: 'Senin, 12 November 2024',
        alamat: 'Jl. Merdeka No. 10, Jakarta',
        members: [
            { id: 1, nama: 'John Doe', alamat: 'Jl. Merdeka No. 10, Jakarta', noTelp: '081234567890' },
            { id: 2, nama: 'Jane Smith', alamat: 'Jl. Raya No. 15, Jakarta', noTelp: '082345678901' },
            { id: 3, nama: 'Mike Johnson', alamat: 'Jl. Sudirman No. 20, Jakarta', noTelp: '083456789012' },
        ],
        instructors: ['Sarah Lee', 'Tom Hardy'],
    },
    2: {
        namaKelas: 'Advanced Programming',
        kategori: 'Tech',
        jam: '10:00 AM',
        hariTanggal: 'Selasa, 13 November 2024',
        alamat: 'Jl. Teknologi No. 5, Bandung',
        members: [
            { id: 1, nama: 'Alice Brown', alamat: 'Jl. Cihampelas No. 12, Bandung', noTelp: '081234567890' },
            { id: 2, nama: 'Bob White', alamat: 'Jl. Dago No. 25, Bandung', noTelp: '082345678901' },
            { id: 3, nama: 'Charlie Green', alamat: 'Jl. Asia Afrika No. 50, Bandung', noTelp: '083456789012' },
        ],
        instructors: ['Michael Davis'],
    },
};

const DetailKelas = () => {
    const { id } = useParams(); // Get the class ID from the URL
    const navigate = useNavigate(); // For navigation

    const kelas = classDetails[id]; // Get the class details based on the ID

    const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
    const [editForm, setEditForm] = useState(kelas || {}); // State for storing form values

    const handleProfileClick = (memberId) => {
        // Navigate to member's profile page (you can update the path to match your routing)
        navigate(`/mitra/profile/${memberId}`);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        // Here you would send the data to your backend for saving
        // For now, just close the modal and log the updated form
        console.log('Updated Class:', editForm);
        setIsModalOpen(false);
    };

    if (!kelas) {
        return (
            <div className="w-full bg-white p-6 lg:p-16 rounded-lg shadow-lg min-h-[80vh]">
                <h2 className="text-2xl font-semibold text-center">Kelas Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/mitra/kelas')} // Go back to the classes list
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg block mx-auto"
                >
                    Kembali ke Daftar Kelas
                </button>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-6 lg:px-16 py-24 rounded-lg shadow-xl min-h-[80vh]">
            <div className="w-full mx-auto">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">{kelas.namaKelas}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full">
                    <div className='flex flex-col sm:w-1/2'>
                        <p className="text-lg text-gray-600">
                            <strong className="text-gray-800">Kategori:</strong> {kelas.kategori}
                        </p>
                        <p className="text-lg text-gray-600">
                            <strong className="text-gray-800">Jam:</strong> {kelas.jam}
                        </p>
                        <p className="text-lg text-gray-600">
                            <strong className="text-gray-800">Hari/Tanggal:</strong> {kelas.hariTanggal}
                        </p>
                        <p className="text-lg text-gray-600">
                            <strong className="text-gray-800">Alamat:</strong> {kelas.alamat}
                        </p>
                    </div>

                    <div className='flex sm:w-auto'>
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal when clicked
                            className="mt-4 flex items-center space-x-2 justify-center bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                        >
                            <FiEdit /><span>Edit Kelas</span>
                        </button>
                    </div>
                </div>

                {/* Member Table */}
                <div className="overflow-x-auto mt-8">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Anggota Kelas</h4>
                    <table className="overflow-x-auto bg-white shadow-md sm:rounded-lg w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">No.</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Nama</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Alamat</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Nomor Telepon</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelas.members.map((member, index) => (
                                <tr key={member.id} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{member.nama}</td>
                                    <td className="py-2 px-4">{member.alamat}</td>
                                    <td className="py-2 px-4">{member.noTelp}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleProfileClick(member.id)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                        >
                                            Lihat Profil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/mitra/kelas')} // Go back to the classes list
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    >
                        Kembali ke Daftar Kelas
                    </button>
                </div>
            </div>

            {/* Modal for Editing Class */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Edit Kelas</h3>
                        {['namaKelas', 'kategori', 'jam', 'hariTanggal', 'alamat'].map((field) => (
                            <div className="mb-4" key={field}>
                                <label htmlFor={field} className="block text-gray-700 capitalize">{field}</label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={editForm[field] || ''}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailKelas;
