import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const classes = [
  {
    id: 1, // Add an ID for each class
    title: "CARDIO",
    image: "/assets/images/kelascardio.jpg",
    location: "Raffles Hotel Jakarta",
    address: "Ciputra World 1, Jl. Prof. DR. Satrio No.5, Jakarta, Daerah Khusus Ibukota Jakarta 12940",
    hours: "06.00 - 22.00 WIB",
    price: "Mulai 200.000-an",
  },
  {
    id: 2, // Add an ID for each class
    title: "PEMBENTUKKAN OTOT",
    image: "/assets/images/gym.jpeg",
    location: "Abadi Suite Jambi",
    address: "Jalan Telanai Pura, no 123 Lt.3",
    hours: "06.00 - 22.00 WIB",
    price: "Mulai 200.000-an",
  },
];

const KelasPelatihan = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Header with buttons and search bar */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-8 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <Link to="/semua-kelas"> {/* Link to navigate to "Semua Kelas" page */}
            <button className="text-green-700 font-semibold hover:text-green-900">Semua Kelas</button>
          </Link>
          <Link to="/daftar-pelatih"> {/* Link to navigate to "Daftar Pelatih" page */}
            <button className="text-green-700 font-semibold hover:text-green-900">Daftar Pelatih</button>
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

      {/* Single box to display all classes */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl w-full">
        {classes
          .filter((classInfo) =>
            classInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((classInfo) => (
            <div key={classInfo.id} className="flex flex-col md:flex-row mb-6">
              <img
                src={classInfo.image}
                alt={classInfo.title}
                className="w-full md:w-1/3 h-48 object-cover rounded-lg"
              />
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-xl font-bold mb-2">{classInfo.title}</h2>
                <p className="text-green-700 font-semibold">{classInfo.location}</p>
                <p className="text-gray-600">{classInfo.address}</p>
                <p className="text-gray-600">Jam Operasi: {classInfo.hours}</p>
                <p className="text-green-700 font-semibold">Harga: {classInfo.price}</p>
                <div className="mt-4 flex space-x-4">
                  <Link to={`/kelas/${classInfo.id}`}> {/* Navigate to the class detail page */}
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition">
                      Lihat Kelas
                    </button>
                  </Link>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition">
                    Daftar Kelas
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KelasPelatihan;
