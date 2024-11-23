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
    <button onClick={()=> navigate('/mitra/kelas')}
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
        <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between gap-6 w-full">

            {/* Data Kelas */}
            <div
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-xl w-full lg:w-1/2">
                <h3 className="text-3xl font-bold mb-4 text-center underline decoration-wavy decoration-yellow-300">
                    Data Kelas
                </h3>
                <div className="space-y-4">
                    <p className="text-lg">
                        <span className="font-semibold">Kategori:</span> {kelas.category.name}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Harga:</span> Rp {kelas.price.toLocaleString()}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Alamat:</span> {kelas.address}
                    </p>
                    <p className="text-lg font-semibold">Jadwal:</p>
                    <ul className="list-disc ml-5 space-y-1">
                        {kelas.schedules.map((schedule, index) => (
                        <li key={index}>
                            {schedule.hari}, {schedule.jam}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Data Trainer */}
            <div
                className="bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 p-6 rounded-lg shadow-xl w-full lg:w-1/2">
                <h3 className="text-3xl font-bold mb-4 text-center underline decoration-wavy decoration-blue-500">
                    Data Trainer
                </h3>
                <div className="space-y-4">
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Name:</span> {kelas.trainer.name}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Telepon:</span> {kelas.trainer.phone}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Alamat:</span> {kelas.trainer.alamat}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Age:</span> {kelas.trainer.age} Tahun
                    </p>
                    {kelas.trainer.deletedAt && (
                    <p className="text-lg text-red-500">
                        <span className="font-semibold">Status:</span> Dihapus pada {kelas.trainer.deletedAt}
                    </p>
                    )}
                </div>
            </div>

        </div>




        {/* Members Table */}
        <div className="overflow-x-auto mt-8">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Anggota Kelas</h4>
            <table className="min-w-full bg-white shadow-lg sm:rounded-lg overflow-hidden text-center">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <th className="py-3 px-5 text-sm font-medium text-left">No.</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Nama</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Kota</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Alamat</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Nomor Telepon</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Tanggal Daftar</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Status</th>
                        <th className="py-3 px-5 text-sm font-medium text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelas.members && kelas.members.length > 0 ? (
                    kelas.members.map((member, index) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50 transition-all">
                        <td className="py-4 px-5">{index + 1}</td>
                        <td className="py-4 px-5">{member.user.name}</td>
                        <td className="py-4 px-5">{member.user.city}</td>
                        <td className="py-4 px-5">{member.user.address}</td>
                        <td className="py-4 px-5">{member.user.phone}</td>
                        <td className="py-4 px-5">
                            <span>
                                {new Date(member.updatedAt).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                })}
                            </span>
                            <br />
                            <span>
                                Jam: {new Date(member.updatedAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                })} WIB
                            </span>
                        </td>

                        <td className="py-4 px-5">
                            <p className={`py-2 px-4 text-center font-semibold rounded-lg ${member.status==='active'
                                ? 'bg-green-500 text-white' : member.status==='pending' ? 'bg-yellow-500 text-white' :
                                member.status==='inactive' ? 'bg-red-500 text-white' : '' }`}>
                                {member.status}
                            </p>
                        </td>

                        <td className="py-4 px-5 text-center">
                            <div className="flex space-x-4 justify-center">
                                <button onClick={()=> handleProfileClick(member.user.id)}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700
                                    transition-all flex items-center justify-center shadow-md">
                                    <FaUserAlt className="inline-block mr-2" /> Lihat Profil
                                </button>
                                {/* You can add other buttons here if needed */}
                            </div>
                        </td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="8" className="py-4 px-5 text-center text-gray-600">
                            Belum ada anggota
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>

        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
            <button onClick={()=> navigate('/mitra/kelas')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full
                hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-300
                ease-in-out">
                <FaCity className="inline-block mr-2 text-xl" /> Kembali ke Daftar Kelas
            </button>
        </div>

    </div>
</div>
);
};

export default DetailKelas;