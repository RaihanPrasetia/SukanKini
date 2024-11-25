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
        <button onClick={() => navigate('/mitra/kelas')}
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
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4">
            <div className="bg-gradient-to-r from-[#E8BCB9] to-[#F4D0D1] p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto">
              <h3 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Data Kelas</h3>

              {/* Kategori */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-semibold text-indigo-600">Kategori:</span> {kelas.category.name}
              </p>

              {/* Harga */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-semibold text-indigo-600">Harga:</span> Rp {kelas.price.toLocaleString()}
              </p>

              {/* Alamat */}
              <p className="text-lg text-gray-800 mb-6">
                <span className="font-semibold text-indigo-600">Alamat:</span> {kelas.address}
              </p>

              {/* Jadwal */}
              <div className="mt-6">
                <p className="text-lg font-medium text-gray-800 mb-4">Jadwal:</p>
                <ul className="list-none space-y-4">
                  {kelas.schedules.map((schedule, index) => {
                    const formattedTime = schedule.jam.split(':').slice(0, 2).join(':');
                    return (
                      <li key={index} className="flex justify-between items-center px-4 py-3 bg-[#F9E2E6] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <span className="text-gray-800 font-medium">{schedule.hari}</span>
                        <span className="text-indigo-600 font-semibold">{formattedTime}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mt-6 w-full">
                <p className="text-lg font-medium text-gray-800 mb-4">Benefit:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {kelas.benefits.map((benefit, index) => {
                    return (
                      <div key={index} className="w-full px-6 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h1 className="text-indigo-600 font-semibold text-lg mb-2">{index + 1}. {benefit.name}</h1>
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>


          {/* Trainer Data */}
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
              <h3 className="text-3xl font-semibold text-center text-teal-800 mb-6">Data Trainer</h3>

              {/* Nama */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-medium text-teal-700">Nama:</span> {kelas.trainer.name}
              </p>

              {/* Telepon */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-medium text-teal-700">Telepon:</span> {kelas.trainer.phone}
              </p>

              {/* Alamat */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-medium text-teal-700">Alamat:</span> {kelas.trainer.alamat}
              </p>

              {/* Usia */}
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-medium text-teal-700">Usia:</span> {kelas.trainer.age} Tahun
              </p>

              {/* Pesan jika sudah dihapus */}
              {kelas.trainer.deletedAt && (
                <p className="text-sm text-red-500 italic text-center">Trainer sudah dihapus.</p>
              )}
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
              {kelas.members && kelas.members.filter(member => member.status !== 'inactive').length > 0 ? (
                kelas.members
                  .filter(member => member.status !== 'inactive')
                  .map((member, index) => (
                    <tr key={member.id} className="border-b border-gray-200 hover:bg-teal-50 transition duration-200">
                      {/* No. */}
                      <td className="py-4 px-6 text-center text-gray-800">{index + 1}</td>

                      {/* Nama */}
                      <td className="py-4 px-6 text-gray-800">{member.user.name}</td>

                      {/* Kota */}
                      <td className="py-4 px-6 text-gray-600">{member.user.city}</td>

                      {/* Alamat */}
                      <td className="py-4 px-6 text-gray-600">{member.user.address}</td>

                      {/* Telepon */}
                      <td className="py-4 px-6 text-gray-600">{member.user.phone}</td>

                      {/* Tanggal & Jam */}
                      <td className="py-4 px-6 text-gray-600">
                        <span>{new Date(member.updatedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <br />
                        <span>Jam: {new Date(member.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })} WIB</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`py-1 px-2 text-center font-semibold rounded-full 
                ${member.status === 'active' ? 'bg-green-500 text-white' :
                              member.status === 'pending' ? 'bg-yellow-500 text-white' :
                                'bg-red-500 text-white'}`}
                        >
                          {member.status}
                        </span>
                      </td>

                      {/* Profil Button */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleProfileClick(member.user.id)}
                          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                        >
                          <FaUserAlt className="inline-block mr-2" /> Lihat Profil
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 px-4 text-center text-gray-600 font-semibold">Belum ada anggota</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/mitra/kelas')} className="bg-indigo-600 text-white py-2 px-6 rounded-lg
                hover:bg-indigo-700 transition-all duration-200">
            <FaCity className="inline-block mr-2" /> Kembali ke Daftar Kelas
          </button>
        </div>
      </div>
    </div>

  );
};

export default DetailKelas;