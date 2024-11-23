import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DaftarKelasPopup from "./DaftarKelas";
import { FaArrowDown } from "react-icons/fa";
import classService from "../../../service/User/classService";

const KelasPelatihan = () => {
const [searchTerm, setSearchTerm] = useState("");
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedClass, setSelectedClass] = useState(null);
const [classData, setClassData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchClasses = async () => {
setLoading(true);
setError(null);
try {
const classes = await classService.getAllClasses();
setClassData(classes); // Assign data directly
} catch (err) {
setError(err.message || "Failed to fetch classes.");
} finally {
setLoading(false);
}
};

fetchClasses();
}, []);

const openPopup = (classInfo) => {
setSelectedClass(classInfo); // Mengatur data kelas yang dipilih
setIsPopupOpen(true); // Membuka modal
};


const closePopup = () => {
setIsPopupOpen(false);
setSelectedClass(null);
};

const scrollToKelas = () => {
const kelasSection = document.getElementById("daftarkelas");
if (kelasSection) {
window.scrollTo({
top: kelasSection.offsetTop - 50,
behavior: "smooth",
});
}
};

return (
<>
  {/* Hero Section */}
  <section className="w-full min-h-[70vh] relative">
    <div
      className="flex flex-col items-center justify-center text-center p-10 absolute inset-0 bg-cover bg-center rounded-lg"
      style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1728486145245-d4cb0c9c3470?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}>
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg z-10">
        Ayo Jadi Lebih Sehat dan Bugar!
      </h1>
      <p className="mt-4 text-xl sm:text-2xl font-semibold text-white drop-shadow-lg z-10">
        Temukan Kelas Kebugaran yang Paling Tepat untukmu
      </p>
      <p className="mt-2 text-sm sm:text-base text-white drop-shadow-lg z-10">
        Kami punya berbagai pilihan kelas kebugaran yang siap membantumu mencapai tujuan fitnessmu. Yuk, mulai sekarang!
      </p>
      <button onClick={scrollToKelas}
        className="absolute bottom-5 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce z-10">
        <FaArrowDown size={18} />
      </button>
    </div>
  </section>

  {/* Daftar Kelas Section */}
  <section id="daftarkelas" className="py-16 px-6 lg:px-20 min-h-screen bg-gray-50">
    <div
      className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-8 space-y-4 md:space-y-0">
      <div className="flex space-x-6">
        <Link to="/semua-kelas">
        <button className="text-green-700 font-semibold hover:text-green-900 transition-all">
          Semua Kelas
        </button>
        </Link>
        <Link to="/daftar-pelatih">
        <button className="text-green-700 font-semibold hover:text-green-900 transition-all">
          Pilih Kategori
        </button>
        </Link>
        <button className="text-green-700 font-semibold hover:text-green-900 transition-all">
          Lokasi
        </button>
      </div>
      <div className="relative flex items-center w-full md:w-auto">
        <input type="text" placeholder="Cari Kelas" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-80 focus:outline-none
        focus:border-green-500 transition-all"
        />
        <button className="absolute right-2 text-green-500 hover:text-green-700 transition-all">
          🔍
        </button>
      </div>
    </div>

    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-green-800">
      DAFTAR KELAS PELATIHAN
    </h1>

    {loading ? (
    <p className="text-center text-green-600">Loading classes...</p>
    ) : error ? (
    <p className="text-center text-red-600">{error}</p>
    ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {classData
      .filter((classInfo) =>
      classInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((classInfo) => (
      <div key={classInfo.id}
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
        <img src={`/images/kelas/${classInfo.imagePath}`} alt={classInfo.name}
          className="w-full h-56 object-cover rounded-lg mb-4" />

        <h2 className="text-xl font-semibold mb-2">{classInfo.name}</h2>
        <p className="text-green-700 font-semibold">{classInfo.trainer.name}</p>
        <p className="text-gray-600 text-sm">{classInfo.alamat}</p>

        {/* Menampilkan Jadwal dengan format jam:menit */}
        <p className="text-gray-600 text-sm">Jadwal:</p>
        <ul className="list-inside list-disc pl-6 text-gray-600 text-sm">
          {classInfo.schedules.map((schedule, idx) => {
          // Memformat waktu menjadi hanya jam dan menit
          const time = schedule.jam.slice(0, 5); // Mengambil hanya jam dan menit (HH:MM)
          return (
          <li key={idx}>
            {schedule.hari} {time}
          </li>
          );
          })}
        </ul>


        <p className="text-green-700 font-semibold">
          Harga: Rp {classInfo.price.toLocaleString()}
        </p>

        <div className="mt-4 flex space-x-4">
          <Link to={`/kelas/${classInfo.id}`}> <button
            className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition-all">
          Lihat Kelas
          </button>
          </Link>
          <button onClick={()=> openPopup(classInfo)}
            className="bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow hover:bg-green-600
            transition-all"
            >
            Daftar Kelas
          </button>
        </div>
      </div>
      ))}
    </div>

    )}

    {isPopupOpen &&
    <DaftarKelasPopup onClose={closePopup} classInfo={selectedClass} />}
  </section>
</>
);
};

export default KelasPelatihan;