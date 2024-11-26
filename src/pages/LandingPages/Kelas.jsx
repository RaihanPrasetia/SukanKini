import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import throttle from "lodash.throttle";

const Kelas = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Throttled scroll handler inside useEffect
    const throttledScrollHandler = throttle(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsInView(rect.top <= windowHeight - 100 && rect.bottom >= 0);
      }
    }, 100);

    // Add event listener for scroll
    window.addEventListener("scroll", throttledScrollHandler);

    // Clean up the event listener and throttle cancel on component unmount
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      throttledScrollHandler.cancel();
    };
  }, []); // Empty dependency array means this effect runs only once

  const communityData = [
    { id: 1, title: "Yoga & Flexibilitas", image: "/assets/images/kelasuser/yoga.jpg" },
    { id: 2, title: "Pembentukan Otot", image: "/assets/images/kelasuser/otot.jpg" },
    { id: 3, title: "Cardio", image: "/assets/images/kelasuser/cardio.jpg" },
    { id: 4, title: "Zumba", image: "/assets/images/kelasuser/zumba.jpg" },
    { id: 5, title: "Relaksasi", image: "/assets/images/kelasuser/relaksasiii.jpg" },
    { id: 6, title: "Dance", image: "/assets/images/kelasuser/dance.jpg" },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex flex-col justify-center items-center px-6 lg:px-20 space-y-8 py-16 w-full"
    >
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-green-600">
          Ikuti 40+ variasi kelas sepuasnya
        </h2>
        <p className="text-gray-600 mt-2">
          Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 w-full md:flex md:flex-wrap md:justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {["Cardio", "Dance", "Mind & Body", "Strength"].map((category) => (
          <button
            key={category}
            className="px-4 py-2 border border-green-500 text-green-700 rounded-xl hover:bg-green-500 hover:text-white transition transform duration-150 hover:scale-105"
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {communityData.map((community, index) => (
          <motion.div
            key={community.id}
            className="relative w-full group overflow-hidden rounded-md shadow-lg transition-transform duration-500 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}  // Initial opacity and y-axis position
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}  // Animate opacity and translateY
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}  // Individual delay for each card
          >
            <img
              src={community.image}
              alt={community.title}
              className="w-full h-60 md:h-80 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-md transition-opacity duration-300 group-hover:opacity-20"></div>
            <p className="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {community.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Kelas;
