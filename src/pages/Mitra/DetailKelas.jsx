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
<div className="w-full bg-white p-8 lg:px-16 py-24 rounded-lg shadow-xl min-h-[80vh]">
    <div className="w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{kelas.name}</h2>

        {/* Class Details Section */}
        <div
            className="flex flex-col lg:flex-row items-start sm:items-center justify-between w-full space-y-6 lg:space-y-0 lg:space-x-12">

            {/* Kelas Data */}
            <div className="flex flex-col justify-between items-center w-full lg:w-1/2">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg shadow-lg w-full">
                    <h3 className='text-2xl font-semibold text-center text-indigo-700 mb-4'>Data Kelas</h3>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Kategori:</span>
                        {kelas.category.name}</p>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Harga:</span> Rp
                        {kelas.price.toLocaleString()}</p>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Alamat:</span>
                        {kelas.address}</p>
                    <p className="text-lg text-gray-700 font-medium">Jadwal:</p>
                    <ul className="list-disc ml-6 text-gray-700">
                        {kelas.schedules.map((schedule, index) => (
                        <li key={index}>{schedule.hari}, {schedule.jam}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Trainer Data */}
            <div className="flex flex-col justify-center items-end w-full lg:w-1/2">
                <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-lg shadow-lg w-full">
                    <h3 className='text-2xl font-semibold text-center text-teal-700 mb-4'>Data Trainer</h3>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Nama:</span>
                        {kelas.trainer.name}</p>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Telepon:</span>
                        {kelas.trainer.phone}</p>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Alamat:</span>
                        {kelas.trainer.alamat}</p>
                    <p className="text-lg text-gray-700"><span className="font-medium text-gray-900">Usia:</span>
                        {kelas.trainer.age} Tahun</p>
                    <p className="text-gray-500">{kelas.trainer.deletedAt && 'Trainer sudah dihapus.'}</p>
                </div>
            </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto mt-8">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Anggota Kelas</h4>
            <table className="bg-white shadow-lg sm:rounded-lg w-full text-center border-collapse">
                <thead>
                    <tr className="bg-indigo-500 text-white">
                        <th className="py-3 px-6">No.</th>
                        <th className="py-3 px-6">Nama</th>
                        <th className="py-3 px-6">Kota</th>
                        <th className="py-3 px-6">Alamat</th>
                        <th className="py-3 px-6">Nomor Telepon</th>
                        <th className="py-3 px-6">Tanggal Daftar</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelas.members && kelas.members.length > 0 ? (
                    kelas.members.map((member, index) => (
                    <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{member.user.name}</td>
                        <td className="py-3 px-6">{member.user.city}</td>
                        <td className="py-3 px-6">{member.user.address}</td>
                        <td className="py-3 px-6">{member.user.phone}</td>
                        <td className="py-3 px-6">
                            <span>{new Date(member.updatedAt).toLocaleDateString('id-ID', { weekday: 'long', year:
                                'numeric', month: 'long', day: 'numeric' })}</span>
                            <br />
                            <span>Jam: {new Date(member.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit',
                                minute: '2-digit', hour12: false })} WIB</span>
                        </td>
                        <td className="py-3 px-6">
                            <span className={`py-1 px-2 text-center font-semibold rounded-lg ${member.status==='active'
                                ? 'bg-green-500 text-white' : member.status==='pending' ? 'bg-yellow-500 text-white'
                                : 'bg-red-500 text-white' }`}>
                                {member.status}
                            </span>
                        </td>
                        <td className="py-3 px-6">
                            <button onClick={()=> handleProfileClick(member.user.id)} className="bg-indigo-600
                                text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200">
                                <FaUserAlt className="inline-block mr-2" /> Lihat Profil
                            </button>
                        </td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="8" className="py-4 px-4 text-center text-gray-600">Belum ada anggota</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
            <button onClick={()=> navigate('/mitra/kelas')} className="bg-indigo-600 text-white py-2 px-6 rounded-lg
                hover:bg-indigo-700 transition-all duration-200">
                <FaCity className="inline-block mr-2" /> Kembali ke Daftar Kelas
            </button>
        </div>
    </div>
</div>

);
};

export default DetailKelas;