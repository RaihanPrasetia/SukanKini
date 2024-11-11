// KelasPelatihan.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DaftarKelasPopup from './DaftarKelas'; // Import the DaftarKelasPopup component
import { FaArrowDown } from 'react-icons/fa';

const classes = [
  {
    id: 1,
    title: "CARDIO",
    image: "/assets/images/kelasuser/cardio.jpg",
    location: "Raffles Hotel Jakarta",
    address: "Ciputra World 1, Jl. Prof. DR. Satrio No.5, Jakarta, Daerah Khusus Ibukota Jakarta 12940",
    hours: "06.00 - 22.00 WIB",
    price: "Mulai 200.000-an",
  },
  {
    id: 2,
    title: "PEMBENTUKKAN OTOT",
    image: "/assets/images/kelasuser/otot.jpg",
    location: "Abadi Suite Jambi",
    address: "Jalan Telanai Pura, no 123 Lt.3",
    hours: "06.00 - 22.00 WIB",
    price: "Mulai 200.000-an",
  },
];

const KelasPelatihan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const openPopup = (classInfo) => {
    setSelectedClass(classInfo);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedClass(null);
  };
  const handleDetailClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  const scrollToKelas = () => {
    const kelasSection = document.getElementById("daftarkelas");
    if (kelasSection) {
      window.scrollTo({
        top: kelasSection.offsetTop - 50, // Menggeser sedikit ke atas (50px)
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className="w-full min-h-[40vh]">
        <div
          className="flex flex-col items-center justify-center lg:px-16 px-6 py-10 h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/bg-kelas.jpeg')",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4 pb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ayo Jadi Lebih Sehat dan Bugar!
            </h1>
            <p className="mt-4 text-lg md:text-3xl font-semibold text-white">
              Temukan Kelas Kebugaran yang Paling Tepat untukmu
            </p>
            <p className="mt-2 text-sm md:text-base text-white opacity-80">
              Kami punya berbagai pilihan kelas kebugaran yang siap membantumu mencapai tujuan fitnessmu. Yuk, mulai sekarang!
            </p>
          </div>
          <button
            onClick={scrollToKelas}
            className="absolute bottom-5 p-3 text-white bg-green-500 hover:bg-green-500 bg-opacity-75 border border-green-500 rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce"
          >
            <FaArrowDown size={18} /> {/* Ikon panah ke bawah */}
          </button>

        </div>
      </section>
      <section id='daftarkelas' className="flex flex-col items-center  py-16 lg:px-20 px-6  min-h-screen">

        {/* Header with buttons and search bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-8 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <Link to="/semua-kelas">
              <button className="text-green-700 font-semibold hover:text-green-900">Semua Kelas</button>
            </Link>
            <Link to="/daftar-pelatih">
              <button className="text-green-700 font-semibold hover:text-green-900">Pilih Category</button>
            </Link>
            <button className="text-green-700 font-semibold hover:text-green-900">Lokasi</button>
          </div>
          <div className="relative flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari Kelas"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-80 focus:outline-none focus:border-green-500"
            />
            <button className="absolute right-2 text-green-500 hover:text-green-700">
              🔍
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">DAFTAR KELAS PELATIHAN</h1>

        {/* Display all classes */}
        <div className="  w-full">
          {classes
            .filter((classInfo) =>
              classInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((classInfo) => (
              <div key={classInfo.id} className="flex bg-white p-6 rounded-lg flex-col md:flex-row mb-6">
                <img
                  src={classInfo.image}
                  alt={classInfo.title}
                  className="w-full md:w-1/3 h-56 object-cover rounded-lg"
                />
                <div className="p-4 flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{classInfo.title}</h2>
                  <p className="text-green-700 font-semibold">{classInfo.location}</p>
                  <p className="text-gray-600">{classInfo.address}</p>
                  <p className="text-gray-600">Jam Operasi: {classInfo.hours}</p>
                  <p className="text-green-700 font-semibold">Harga: {classInfo.price}</p>
                  <div className="mt-4 flex space-x-4">
                    <Link to={`/kelas/${classInfo.id}`}
                      onClick={handleDetailClick}>
                      <button className="bg-blue-500 text-white px-4 py-2 text-[16px] font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                        Lihat Kelas
                      </button>
                    </Link>
                    <button
                      onClick={() => openPopup(classInfo)}
                      className="bg-green-500 text-white text-[16px] font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    >
                      Daftar Kelas
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Conditionally render the DaftarKelasPopup */}
        {isPopupOpen && (
          <DaftarKelasPopup onClose={closePopup} classInfo={selectedClass} />
        )}
      </section>
    </>


  );
};

export default KelasPelatihan;
