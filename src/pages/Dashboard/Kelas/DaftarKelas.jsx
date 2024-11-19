import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DaftarKelasPopup = ({ onClose, classInfo }) => {
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('Cardio');
  const [jadwal, setJadwal] = useState('09.00 WIB');
  const [durasi, setDurasi] = useState('Jumlah sesi');
  const [hargaPerSesi, setHargaPerSesi] = useState('Rp. 50.000');
  const [totalHarga, setTotalHarga] = useState('Rp. 150.000');
  const [hari, setHari] = useState([]);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  useEffect(() => {
    setDurasi(`${hari.length} Sesi`);
    const hargaSesi = parseInt(hargaPerSesi.replace(/\D/g, ''));
    setTotalHarga(`Rp. ${hargaSesi * hari.length}`);
  }, [hari, hargaPerSesi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Daftar Kelas:', { name, kelas, jadwal, durasi, hari, hargaPerSesi, totalHarga });
    setIsPaymentVisible(true);
  };

  const toggleHari = (day) => {
    if (hari.includes(day)) {
      setHari(hari.filter((d) => d !== day));
    } else {
      setHari([...hari, day]);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Payment Submitted');
    onClose(); // Close popup after payment
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <motion.div
        className="bg-white p-4 rounded-lg shadow-xl flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative overflow-y-auto max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out"
        >
          ✕
        </button>

        {!isPaymentVisible ? (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-center text-green-600 mb-4">Daftar Anggota Kelas</h2>

            {/* Image */}
            <motion.div
              className="w-full flex justify-center p-2 mb-4"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            >
              <img
                src="/assets/images/kelascardio.jpg"
                alt="Promotional"
                className="w-full h-40 md:h-48 rounded-lg object-cover shadow-lg"
              />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Kelas</label>
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="Cardio">Cardio</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Zumba">Zumba</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">Jam (Otomatis Berdasarkan Hari)</label>
                  <input
                    type="text"
                    value={jadwal}
                    onChange={(e) => setJadwal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Jumlah Sesi (Otomatis)</label>
                  <input
                    type="text"
                    value={durasi}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Hari</label>
                <div className="flex space-x-4 mt-2">
                  {['Senin', 'Rabu', 'Kamis'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`px-3 py-2 rounded-md border ${
                        hari.includes(day) ? 'bg-yellow-500 text-white' : 'border-gray-300'
                      } focus:outline-none`}
                      onClick={() => toggleHari(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-md font-medium shadow-lg"
                >
                  Daftar Kelas
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-center text-green-600 mb-4">Pembayaran</h2>

            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Metode Pembayaran</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Kartu Kredit">Kartu Kredit</option>
                  <option value="E-Wallet">E-Wallet</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Total Pembayaran</label>
                <input
                  type="text"
                  value={totalHarga}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-md font-medium shadow-lg"
                >
                  Bayar
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DaftarKelasPopup;
