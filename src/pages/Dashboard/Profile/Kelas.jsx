import React, { useState, useEffect } from 'react';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import profileClass from '../../../service/User/profileClass';

const Kelas = () => {
  const [classDetails, setClassDetails] = useState([]);
  const [allClass, setAllClass] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const allClasses = await profileClass.getAllClasses();
        const todayClasses = await profileClass.getClassesNow();

        setAllClass(allClasses);
        setClassDetails(todayClasses);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-2xl text-green-600">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p>Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto lg:p-8 rounded-3xl transform transition duration-500 space-y-12">
      {/* Kelas Hari Ini Section */}
      {classDetails.length > 0 ? (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-2">Kelas Hari Ini</h1>
          <p className="text-xl text-gray-600">Jangan lupa kelas hari ini!</p>
        </motion.div>
      ) : (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-red-600 mb-2">Tidak ada kelas yang tersedia untuk hari ini!</h1>
        </motion.div>
      )}

      {/* Display Today's Classes */}
      {classDetails.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classDetails.map((kelas) => (
            <motion.div
              key={kelas.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-green-300 hover:scale-105 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: kelas.id * 0.1 }}
            >
              <div className="relative w-full mb-4">
                <img
                  src={kelas.class?.imagePath ? `/images/kelas/${kelas.class.imagePath}` : '/images/default.jpg'}
                  alt={`${kelas.class?.name} Class`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {kelas.class?.name}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-green-800 mb-2">{kelas.class?.name}</h4>
                <p className="text-gray-600 text-sm flex items-center mb-1">
                  <FiMapPin className="h-5 w-5 mr-2 text-green-600" />
                  {kelas.class?.address || 'Alamat tidak tersedia'}
                </p>

                {/* Display Class Schedule */}
                {kelas.class?.schedules?.map((schedule, index) => (
                  <div key={index} className="text-gray-600 text-sm flex items-center mb-1">
                    <FiClock className="h-5 w-5 mr-2 text-green-600" />
                    <span>{schedule.jam || 'Jam tidak tersedia'} WIB</span>
                  </div>
                ))}
                <p className="text-gray-600 text-sm flex items-center mb-3">
                  <FiCalendar className="h-5 w-5 mr-2 text-green-600" />
                  {kelas.class?.schedules?.length > 0 ? kelas.class.schedules[0].hari : 'Hari tidak tersedia'}
                </p>

                <button className="mt-4 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                  Lihat Detail Kelas
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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

      {/* Display Favorite Classes */}
      {allClass.length === 0 ? (
        <p className="text-center text-xl text-red-600">Anda belum terdaftar di kelas manapun.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {allClass.map((favorite) => (
            <motion.div
              key={favorite.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-yellow-300 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: favorite.id * 0.1 }}
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={favorite.class?.imagePath ? `/images/kelas/${favorite.class.imagePath}` : '/images/default.jpg'}
                  alt={`${favorite.class?.name} Class`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {favorite.class?.name}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">{favorite.class?.name}</h4>
              <p className="text-gray-600 text-center mb-2 text-lg">{favorite.class?.address || 'Alamat tidak tersedia'}</p>

              {/* Display Class Schedule */}
              {favorite.class?.schedules?.map((schedule, index) => (
                <div key={index} className="text-gray-600 text-sm flex items-center mb-1">
                  <FiClock className="h-5 w-5 mr-2 text-green-600" />
                  {schedule.hari} - {schedule.jam || 'Jam tidak tersedia'}
                </div>
              ))}

              <button className="mt-4 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                Lihat Detail Kelas
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kelas;
