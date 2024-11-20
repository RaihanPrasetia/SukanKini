import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PaymentPopup from './Payment'; // Adjust the path as needed

const DaftarKelasPopup = ({ onClose, classInfo }) => {
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('Cardio');
  const [jadwal, setJadwal] = useState('09.00 WIB');
  const [durasi, setDurasi] = useState('Jumlah sesi');
  const [hargaPerSesi, setHargaPerSesi] = useState('Rp. 50.000');
  const [totalHarga, setTotalHarga] = useState('Rp. 150.000');
  const [hari, setHari] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  // Update jumlah sesi dan total harga otomatis berdasarkan hari yang dipilih
  useEffect(() => {
    setDurasi(`${hari.length} Sesi`);
    const hargaSesi = parseInt(hargaPerSesi.replace(/\D/g, '')); // Mengonversi harga menjadi angka
    setTotalHarga(`Rp. ${hargaSesi * hari.length}`);
  }, [hari, hargaPerSesi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Daftar Kelas:', { name, kelas, jadwal, durasi, hari, hargaPerSesi, totalHarga });
    alert('Berhasil mendaftar untuk kelas!');
    onClose();
  };

  const toggleHari = (day) => {
    if (hari.includes(day)) {
      setHari(hari.filter(d => d !== day));
    } else {
      setHari([...hari, day]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <motion.div
        className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[800px] lg:my-auto relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out transform hover:scale-125"
        >
          ✕
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-center">Daftar Anggota Kelas</h2>
        {/* Left Section - Promotional Image/Text with Slide-In Animation */}
        <motion.div
          className="w-full  flex items-start justify-center p-4 text-center"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        >
          <img
            src="/assets/images/kelascardio.jpg"
            alt="Promotional"
            className="w-full h-56 rounded-md transform transition object-cover"
          />
        </motion.div>
        {/* Right Section - Form with Slide-In Animation */}
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className='flex w-full justify-between gap-4 mb-3'>
              <div className='w-full'>
                <label className="block text-gray-700">Nama Lengkap</label>
                <motion.input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block text-gray-700">Kelas</label>
                <motion.select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                  required
                >
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Zumba">Zumba</option>
                </motion.select>
              </div>
            </div>

            <div className="mb-3 gap-4 flex w-full justify-between">
              <div className='w-full'>
                <label className="block text-gray-700">Jam (Otomatis Berdasarkan Hari)</label>
                <motion.input
                  type="text"
                  value={jadwal}
                  onChange={(e) => setJadwal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 ease-in-out hover:scale-105"
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block text-gray-700">Jumlah Sesi (Otomatis)</label>
                <motion.input
                  type="text"
                  value={durasi}
                  className=" px-3 py-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Hari</label>
              <div className="flex space-x-2">
                {['Senin', 'Rabu', 'Kamis'].map((day) => (
                  <motion.button
                    key={day}
                    type="button"
                    className={`px-3 py-2 rounded-md border ${hari.includes(day) ? 'bg-yellow-500 text-white' : 'border-gray-300'} transition-transform duration-200 ease-in-out hover:scale-105`}
                    onClick={() => toggleHari(day)}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className='flex w-full gap-4 justify-between mb-3'>
              <div className="w-full">
                <label className="block text-gray-700">Harga per Sesi</label>
                <motion.select
                  value={hargaPerSesi}
                  onChange={(e) => setHargaPerSesi(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="Rp. 50.000">Rp. 50.000/Sesi</option>
                  <option value="Rp. 75.000">Rp. 75.000/Sesi</option>
                </motion.select>
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Total Harga (Otomatis)</label>
                <motion.input
                  type="text"
                  value={totalHarga}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
              </div>
            </div>

          </form>
          <div className='flex items-center justify-center'>
            {isPopupOpen && <PaymentPopup
              onClose={() => setIsPopupOpen(false)}
              totalHarga={totalHarga}
              bankTujuan="BCA"
              namaPemilik="Ahmad Hussein"
              nomorRek="9723628862"
            />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DaftarKelasPopup;