import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classService from '../../service/classService'; // Import the service function
import { FaUserAlt, FaCity } from 'react-icons/fa'; // Icons for profile

const DetailKelas = () => {
    const { id } = useParams(); // Get the class ID from the URL
    const navigate = useNavigate(); // For navigation

    const [kelas, setKelas] = useState(null); // State to store the class details

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const classData = await classService.getClassById(id); // Fetch class data using the service function
                setKelas(classData);
                console.log(classData)
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails(); // Call the fetch function on component mount
    }, [id]); // Re-fetch if the `id` changes

    const handleProfileClick = (memberId) => {
        // Navigate to member's profile page
        navigate(`/mitra/profile/${memberId}`);
    };

    if (!kelas) {
        return (
            <div className="w-full bg-white p-6 lg:p-16 rounded-lg shadow-lg min-h-[80vh] flex justify-center items-center">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Kelas Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/mitra/kelas')}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg block mx-auto hover:bg-blue-600 transition-all"
                >
                    Kembali ke Daftar Kelas
                </button>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-6 lg:px-16 py-24 rounded-lg shadow-xl min-h-[80vh]">
            <div className="w-full mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{kelas.name}</h2>

                {/* Class Details Section */}
                <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between w-full">

                    <div className="flex flex-col justify-between items-center w-1/2">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full">
                            <h3 className='text-2xl font-semibold mb-2 text-center underline'>Data Kelas</h3>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Kategori:</strong> {kelas.category.name}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Harga:</strong> Rp {kelas.price.toLocaleString()}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Alamat:</strong> {kelas.address}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Jadwal:</strong>
                            </p>
                            <ul className="list-disc ml-6 text-gray-700">
                                {kelas.schedules.map((schedule, index) => (
                                    <li key={index}>
                                        {schedule.hari}, {schedule.jam}
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>
                    <div className="flex  flex-col justify-center items-end w-full">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-1/2">
                            <h3 className='text-2xl font-semibold mb-2 text-center underline'>Data Trainer</h3>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Name:</strong> {kelas.trainer.name}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Telepon: </strong>{kelas.trainer.phone}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Alamat:</strong> {kelas.trainer.alamat}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-gray-900">Age: </strong>
                                {kelas.trainer.age} Tahun
                            </p>
                            <p>{kelas.trainer.deletedAt}</p>

                        </div>

                    </div>
                </div>

                {/* Members Table */}
                <div className="overflow-x-auto mt-8">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Anggota Kelas</h4>
                    <table className="bg-white shadow-lg sm:rounded-lg w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">No.</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Nama</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Kota</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Alamat</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Nomor Telepon</th>
                                <th className="py-2 px-4 text-left text-gray-800 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelas.members && kelas.members.length > 0 ? (
                                kelas.members.map((member, index) => (
                                    <tr key={member.id} className="border-b border-gray-200">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{member.user.name}</td>
                                        <td className="py-2 px-4">{member.user.city}</td>
                                        <td className="py-2 px-4">{member.user.address}</td>
                                        <td className="py-2 px-4">{member.user.phone}</td>
                                        <td className="py-2 px-4 text-center">
                                            <button
                                                onClick={() => handleProfileClick(member.user.id)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-all"
                                            >
                                                <FaUserAlt className="inline-block mr-2" /> Lihat Profil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 px-4 text-center text-gray-600">
                                        Belum ada anggota
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/mitra/kelas')}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        <FaCity className="inline-block mr-2" /> Kembali ke Daftar Kelas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailKelas;
