import React from "react";
import { motion } from "framer-motion";

export default function Community() {
  const communities = [
    {
      name: "Komunitas Relaksasi",
      image:
        "https://images.unsplash.com/photo-1611566620327-5e879d9b0955?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Komunitas Yoga",
      image:
        "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Komunitas Zumba",
      image:
        "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center font-poppins">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1716306886418-f84f6d4c2f3a?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          filter: "brightness(0.4)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 pt-20 px-6 w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <motion.button
            className="text-yellow-400 text-3xl transform hover:scale-110 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <i className="fas fa-arrow-left"></i>
          </motion.button>
          <motion.div
            className="flex items-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105">
              Berita & Pemberitahuan
            </button>
            <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105">
              Tanya Komunitas
            </button>
          </motion.div>
          <motion.div
            className="relative w-full md:w-72"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <input
              type="text"
              placeholder="Cari Komunitas..."
              className="w-full px-6 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300 shadow-xl"
            />
          </motion.div>
        </div>

        {/* Community Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {communities.map((community, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 bg-opacity-75 rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
              variants={itemVariants}
            >
              <div className="relative">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold">{community.name}</h2>
                <p className="text-gray-400 text-sm mt-2">
                  Gabung dan nikmati komunitas terbaik untuk kesehatan Anda.
                </p>
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
                  Bergabung
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <p className="text-gray-300 text-lg">
            Temukan komunitas yang tepat untuk Anda dan mulai perjalanan kebugaran Anda hari ini!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
