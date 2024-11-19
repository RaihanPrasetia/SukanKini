import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';

const DetailKelas = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock class details
  const classDetails = {
    1: {
      title: 'CARDIO',
      image: '/assets/images/kelasuser/cardio.jpg',
      description: 'A full-body workout focused on cardiovascular health.',
      location: 'Raffles Hotel Jakarta',
      hours: '06.00 - 22.00 WIB',
      price: 'Mulai 200.000-an',
      pelatih: 'John Deluxe',
    },
    2: {
      title: 'PEMBENTUKKAN OTOT',
      image: '/assets/images/kelasuser/otot.jpg',
      description: 'Strength training for building muscle and endurance.',
      location: 'Abadi Suite Jambi',
      hours: '06.00 - 22.00 WIB',
      price: 'Mulai 200.000-an',
    },
  };

  const classInfo = classDetails[id];

  return (
    <>
      <div className="flex flex-col pb-6 bg-gray-200">
        {/* Header Section */}
        <div
          className="relative w-full h-64 md:h-120 bg-cover bg-center"
          style={{ backgroundImage: `url('${classInfo?.image}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">{classInfo?.title}</h1>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-75 transition"
          >
            <AiOutlineLeft className="text-2xl" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row px-6 md:px-20 py-8 space-y-6 md:space-y-0 md:space-x-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={classInfo?.image}
              alt={classInfo?.title}
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-green-500">{classInfo?.title}</h2>
            <p className="text-gray-700 mt-4">{classInfo?.description}</p>
            <div className="mt-6">
              <p className="text-gray-600">
                <strong>Location:</strong> {classInfo?.location}
              </p>
              <p className="text-gray-600">
                <strong>Hours:</strong> {classInfo?.hours}
              </p>
              <p className="text-gray-600 font-semibold">{classInfo?.price}</p>
              <p className="text-gray-600">
                <strong>Pelatih:</strong>{' '}
                <span className="text-yellow-500">{classInfo?.pelatih}</span>
              </p>
            </div>
            <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
              Daftar Kelas
            </button>
          </div>
        </div>

        {/* Other Classes */}
        <div className="px-6 md:px-20 py-8">
          <h3 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">Daftar Kelas Lain</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={classInfo?.image}
                  alt={classInfo?.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{classInfo?.title}</h4>
                  <p className="text-sm text-gray-600">{classInfo?.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
              Lihat Kelas Lain
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailKelas;
