import React, { useState } from 'react';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';

const Kelas = () => {
  const [classDetails] = useState([
    {
      id: 1,
      name: 'CARDIO',
      location: 'Abadi Suite Jambi',
      time: '07.00 - 08.30 WIB',
      hari: 'Senin',
      image: '/assets/images/kelasuser/cardio.jpg',
    },
    {
      id: 2,
      name: 'YOGA',
      location: 'Zen Studio',
      time: '15.00 - 16.00 WIB',
      hari: 'Senin',
      image: '/assets/images/kelas_yoga.jpeg',
    },
    // Tambahkan kelas lain jika diperlukan
  ]);

  const [favoriteClass] = useState([
    {
      id: 1,
      name: 'BALET',
      location: 'Fitness Center Jambi',
      time: '09.00 - 19.00 WIB',
      image: '/assets/images/kelasuser/balet.jpg',
    },
    {
      id: 2,
      name: 'CARDIO',
      location: 'Abadi Suite Jambi',
      time: '07.00 - 08.30 WIB',
      hari: 'Senin',
      image: '/assets/images/kelasuser/cardio.jpg',
    },
    {
      id: 3,
      name: 'YOGA',
      location: 'Zen Studio',
      time: '15.00 - 16.00 WIB',
      image: '/assets/images/kelas_yoga.jpeg',
    }
  ]
  );

  return (
    <div className="w-full mx-auto lg:p-8  rounded-3xl transform transition duration-500 ">
      {/* Kelas Hari Ini - Menggunakan Mapping */}
      <h1 className="text-4xl font-bold  text-green-800">Kelas Hari Ini</h1>
      <p className='mb-6 text-xl'>Jangan lupa kelas hari ini</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classDetails.map((kelas) => (
          <div key={kelas.id} className="bg-white p-5 flex rounded-lg duration-1000 transition-transform transform hover:scale-110 shadow-lg border border-green-300">
            <div className="relative w-1/3 mr-4">
              <img
                src={kelas.image}
                alt={`${kelas.name} Class`}
                className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {kelas.name}
              </span>
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <h4 className="text-lg font-semibold text-green-800 mb-1">{kelas.name}</h4>
              <p className="text-gray-600 text-sm flex items-center mb-1">
                <FiMapPin className="h-5 w-5 mr-1 text-green-600" />
                {kelas.location}
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <FiClock className="h-5 w-5 mr-1 text-green-600" />
                {kelas.time}
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <FiCalendar className="h-5 w-5 mr-1 text-green-600" />
                {kelas.hari}
              </p>
              <button className="mt-2 bg-green-600 text-white font-semibold px-4 py-1 rounded-lg shadow-md transition duration-300 hover:bg-green-700">
                Lihat Detail Kelas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Kelas Favorit */}
      <div className="text-center mt-6">
        <h3 className="text-4xl font-bold text-green-800">Semua Kelas Saya</h3>
        <p className="text-gray-700 text-xl">
          Jangan Lupa untuk melihat jadwal kelas anda yang lain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {favoriteClass.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white p-6 rounded-lg shadow-lg border border-yellow-300 text-center duration-1000 transition-transform transform hover:scale-110"
          >
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
              <img
                src={favorite.image}
                alt={`${favorite.name} Class`}
                className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {favorite.name}
              </span>
            </div>
            <h4 className="text-xl font-semibold text-green-800 mb-2">
              {favorite.name}
            </h4>
            <p className="text-gray-600 text-sm mb-1">{favorite.location}</p>
            <p className="text-gray-600 text-sm">{favorite.time}</p>
            <button className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-700">
              Lihat Detail Kelas
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Kelas;
