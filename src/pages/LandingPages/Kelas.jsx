import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Kelas = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Function to check if the section is in view
  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsInView(rect.top <= windowHeight - 100 && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const communityData = [
    {
      id: 1,
      title: 'Yoga & Flexibilitas',
      image: '/assets/images/kelasuser/yoga.jpg',
    },
    {
      id: 2,
      title: 'Pembentukan Otot',
      image: '/assets/images/kelasuser/otot.jpg',
    },
    {
      id: 3,
      title: 'Cardio',
      image: '/assets/images/kelasuser/cardio.jpg',
    },
    {
      id: 4,
      title: 'Zumba',
      image: '/assets/images/kelasuser/zumba.jpg',
    },
    {
      id: 5,
      title: 'Relaksasi',
      image: '/assets/images/kelasuser/relaksasiii.jpg',
    },
    {
      id: 6,
      title: 'Dance',
      image: '/assets/images/kelasuser/dance.jpg',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex flex-col justify-center items-center px-6 lg:px-20 space-y-8 py-16 w-full"
    >
      {/* Heading Section */}
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-green-600 transition-transform duration-500 transform hover:scale-105"
        >
          Ikuti 40+ variasi kelas sepuasnya
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2 transition-opacity duration-300 hover:opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
        </motion.p>
      </motion.div>

      {/* Category Buttons */}
      <motion.div
        className="grid grid-cols-2 gap-4 w-full md:flex md:flex-wrap md:justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {['Cardio', 'Dance', 'Mind & Body', 'Strength'].map((category) => (
          <motion.button
            key={category}
            className="px-4 py-2 border border-green-500 text-green-700 rounded-xl hover:bg-green-500 hover:text-white transition transform duration-200 hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 100 }, // Card dimulai dari kanan (x: 100)
          visible: {
            opacity: 1, // Card akan muncul
            x: 0, // Card bergerak ke posisi awal (0)
            transition: {
              staggerChildren: 0.3, // Delay secara bertahap untuk setiap card
              duration: 0.8,
            },
          },
        }}
      >
        {communityData.map((community, index) => (
          <motion.div
            key={community.id}
            className="relative w-full group overflow-hidden rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 },
            }}
            transition={{
              delay: index * 0.2, // Delay berdasarkan index elemen
              duration: 0.3,
            }}
          >
            <img
              src={community.image}
              alt={community.title}
              className="w-full h-60 md:h-80 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 group-hover:opacity-0"></div>
            <motion.p
              className="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {community.title}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>


    </div>
  );
};

export default Kelas;
