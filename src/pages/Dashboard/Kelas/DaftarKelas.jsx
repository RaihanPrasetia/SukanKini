import React, { useState } from 'react';
import { motion } from 'framer-motion';  // Importing framer-motion for advanced animations
import PaymentPopup from './Payment'; // Adjust the path as needed

const DaftarKelasPopup = ({ onClose, classInfo }) => {
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('Cardio');
  const [jadwal, setJadwal] = useState('09.00 WIB');
  const [durasi, setDurasi] = useState('3 sesi');
  const [hargaPerSesi, setHargaPerSesi] = useState('Rp. 50.000');
  const [totalHarga, setTotalHarga] = useState('Rp. 150.000');
  const [hari, setHari] = useState(['Senin', 'Rabu', 'Kamis']);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Daftar Kelas:', { name, kelas, jadwal, durasi, hari, hargaPerSesi, totalHarga });
    alert('Berhasil mendaftar untuk kelas!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg flex w-[1000px] relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}  // Smooth fade and scale animation
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out transform hover:scale-125"
        >
          ✕
        </button>

        {/* Left Section - Promotional Image/Text with Slide-In Animation */}
        <motion.div
          className="w-1/2  flex items-center justify-center p-4 text-center"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        >
          <img
            src="/assets/images/kelascardio.jpg"
            alt="Promotional"
            className="max-w-full h-full rounded-md transform transition "
          />
        </motion.div>

        {/* Right Section - Form with Slide-In Animation */}
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold text-center mb-4">Daftar Anggota Kelas</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700">Nama Lengkap</label>
              <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}  // Hover scale animation
                whileFocus={{ scale: 1.05 }}  // Focus scale animation
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Kelas</label>
              <motion.select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <option value="Cardio">Cardio</option>
                <option value="Yoga">Yoga</option>
                <option value="Zumba">Zumba</option>
              </motion.select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Jadwal</label>
              <motion.input
                type="text"
                value={jadwal}
                onChange={(e) => setJadwal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="mb-3 flex space-x-2">
              <motion.input
                type="text"
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.input
                type="text"
                value="Minggu"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                readOnly
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="mb-3 flex space-x-2">
              {['Senin', 'Rabu', 'Kamis'].map((day) => (
                <motion.button
                  key={day}
                  type="button"
                  className={`px-3 py-2 rounded-md border ${hari.includes(day) ? 'bg-yellow-500 text-white' : 'border-gray-300'} transition-transform duration-200 ease-in-out hover:scale-105`}
                  onClick={() => setHari(hari.includes(day) ? hari.filter(d => d !== day) : [...hari, day])}
                  whileHover={{ scale: 1.05 }}
                >
                  {day}
                </motion.button>
              ))}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Harga per Sesi</label>
              <motion.select
                value={hargaPerSesi}
                onChange={(e) => setHargaPerSesi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <option value="Rp. 50.000">Rp. 50.000/Sesi</option>
                <option value="Rp. 75.000">Rp. 75.000/Sesi</option>
              </motion.select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Total Harga</label>
              <motion.input
                type="text"
                value={totalHarga}
                onChange={(e) => setTotalHarga(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                required
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
            </div>

            {/* Add spacing between form and button */}
            <div className="mb-4">
              <motion.button
                type="button"
                onClick={() => setIsPopupOpen(true)} // Open PaymentPopup on click
                className="bg-green-500 w-full text-white px-4 py-2 rounded-md hover:bg-green-600 transition-transform duration-200 ease-in-out hover:scale-110"
                whileHover={{ scale: 1.05 }}
              >
                Daftar Kelas
              </motion.button>
            </div>
          </form>

          {/* Payment Popup */}
          {isPopupOpen && <PaymentPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
      </motion.div>
    </div>
  );
};

export default DaftarKelasPopup;
