import React, { useState } from 'react';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

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
    },
  ]);

  return (
    <div className="w-full mx-auto lg:p-8 rounded-3xl transform transition duration-500">

      {/* Kelas Hari Ini Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">Kelas Hari Ini</h1>
        <p className="text-xl text-gray-600">Jangan lupa kelas hari ini!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {classDetails.map((kelas) => (
          <motion.div
            key={kelas.id}
            className="bg-white p-5 rounded-lg shadow-xl border border-green-300 transition-transform transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: kelas.id * 0.1 }}
          >
            <div className="relative w-full mb-4">
              <img
                src={kelas.image}
                alt={`${kelas.name} Class`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {kelas.name}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-lg font-semibold text-green-800 mb-1">{kelas.name}</h4>
              <p className="text-gray-600 text-sm flex items-center mb-1">
                <FiMapPin className="h-5 w-5 mr-2 text-green-600" />
                {kelas.location}
              </p>
              <p className="text-gray-600 text-sm flex items-center mb-1">
                <FiClock className="h-5 w-5 mr-2 text-green-600" />
                {kelas.time}
              </p>
              <p className="text-gray-600 text-sm flex items-center mb-3">
                <FiCalendar className="h-5 w-5 mr-2 text-green-600" />
                {kelas.hari}
              </p>
              <button className="mt-4 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-700">
                Lihat Detail Kelas
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kelas Favorit Section */}
      <motion.div
        className="text-center mt-16 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-4xl font-bold text-green-800 mb-2">Semua Kelas Saya</h3>
        <p className="text-gray-700 text-xl">Jangan lupa untuk melihat jadwal kelas lainnya!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {favoriteClass.map((favorite) => (
          <motion.div
            key={favorite.id}
            className="bg-white p-6 rounded-lg shadow-xl border border-yellow-300 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: favorite.id * 0.1 }}
          >
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={favorite.image}
                alt={`${favorite.name} Class`}
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {favorite.name}
              </span>
            </div>
            <h4 className="text-xl font-semibold text-green-800 mb-2">{favorite.name}</h4>
            <p className="text-gray-600 text-sm mb-2">{favorite.location}</p>
            <p className="text-gray-600 text-sm">{favorite.time}</p>
            <button className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-700">
              Lihat Detail Kelas
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Kelas;
