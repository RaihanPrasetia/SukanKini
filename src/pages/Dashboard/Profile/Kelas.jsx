import React, { useState } from 'react';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';

const Kelas = () => {
  const [classDetails] = useState([
    {
      id: 1,
      name: 'CARDIO',
      location: 'Abadi Suite Jambi',
      time: '06.00 - 22.00 WIB',
      hari: 'Senin',
      image: 'https://images.unsplash.com/photo-1550977616-efc580084ac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyZGlvfGVufDB8fDB8fHww',
    },
    {
      id: 2,
      name: 'YOGA',
      location: 'Zen Studio',
      time: '07.00 - 21.00 WIB',
      hari: 'Senin',
      image: '/assets/images/kelas_yoga.jpeg',
    },
    // Tambahkan kelas lain jika diperlukan
  ]);

  const favoriteClass = {
    id: 1,
    name: 'HIIT TRAINING',
    location: 'Fitness Center Jambi',
    time: '09.00 - 19.00 WIB',
    image: '/assets/images/kelas_yoga.jpeg',
  };

  return (
    <div className="w-full mx-auto p-8 rounded-3xl transform transition duration-500 ">
      {/* Kelas Hari Ini - Menggunakan Mapping */}
      <h1 className="text-2xl font-bold mb-6 text-green-800">Kelas Hari Ini</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classDetails.map((kelas) => (
          <div key={kelas.id} className="bg-white p-5 flex rounded-lg duration-1000 transition-transform transform hover:scale-110 shadow-lg border border-green-300">
            <div className="relative w-1/3 mr-4">
              <img
                src={kelas.image}
                alt={`${kelas.name} Class`}
                className="w-full h-24 object-cover rounded-lg shadow-md transform transition duration-500 hover:scale-105"
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
                Join Kelas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Kelas Favorit */}
      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold text-green-800">Kelas Favorit Saya</h3>
        <p className="text-gray-700">
          Ikuti kelas {favoriteClass.name} dan nikmati pengalaman kebugaran terbaik!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        <div
          key={favoriteClass.id}
          className="bg-white p-6 rounded-lg shadow-lg border border-yellow-300 text-center duration-1000 transition-transform transform hover:scale-110"
        >
          <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
            <img
              src={favoriteClass.image}
              alt={`${favoriteClass.name} Class`}
              className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
            />
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {favoriteClass.name}
            </span>
          </div>
          <h4 className="text-xl font-semibold text-green-800 mb-2">
            {favoriteClass.name}
          </h4>
          <p className="text-gray-600 text-sm mb-1">{favoriteClass.location}</p>
          <p className="text-gray-600 text-sm">{favoriteClass.time}</p>
          <button className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-700">
            Join Kelas Favorit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
