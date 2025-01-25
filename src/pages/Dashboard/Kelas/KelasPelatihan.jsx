import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DaftarKelasPopup from "./DaftarKelas";
import { FaArrowDown, FaChevronDown, FaSearch } from "react-icons/fa";
import classService from "../../../service/User/classService";

const KelasPelatihan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSearchTerm, setPriceSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = Array.from(
    new Set(classData.map((cls) => cls.category?.name))
  );

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const classes = await classService.getAllClasses();
        setClassData(classes);
      } catch (err) {
        setError(err.message || "Failed to fetch classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const openPopup = (classInfo) => {
    setSelectedClass(classInfo);
    setIsPopupOpen(true);
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

  // Filter data berdasarkan nama, kategori, dan lokasi
  const filteredClasses = classData.filter((classInfo) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();

    // Cek apakah harga lebih kecil atau sama dengan yang dimasukkan
    const isPriceSearch = priceSearchTerm
      ? classInfo.price <= parseFloat(priceSearchTerm)
      : true;

    // Pencocokan berdasarkan nama kelas, kategori, lokasi, atau pemilik
    const matchesSearchTerm =
      classInfo.name.toLowerCase().includes(normalizedSearchTerm) ||
      (classInfo.category?.name &&
        classInfo.category.name.toLowerCase().includes(normalizedSearchTerm)) ||
      (classInfo.address &&
        classInfo.address.toLowerCase().includes(normalizedSearchTerm)) ||
      (classInfo.owner?.name &&
        classInfo.owner.name.toLowerCase().includes(normalizedSearchTerm));

    return (
      matchesSearchTerm &&
      isPriceSearch &&
      (selectedCategory
        ? classInfo.category?.name === selectedCategory
        : true) &&
      (selectedLocation
        ? classInfo.address?.toLowerCase().includes(selectedLocation)
        : true)
    );
  });

  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[100vh] relative">
        <div
          className="flex flex-col items-center justify-center text-center p-10 absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1728486145245-d4cb0c9c3470?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg z-10">
            Ayo Jadi Lebih Sehat dan Bugar!
          </h1>
          <button
            onClick={scrollToKelas}
            className="absolute bottom-5 p-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce z-10"
          >
            <FaArrowDown size={20} />
          </button>
        </div>
      </section>

      {/* Daftar Kelas Section */}
      <section
        id="daftarkelas"
        className="py-16 px-6 lg:px-20 min-h-screen bg-gray-50"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-y-0 space-y-6">
          <div className="flex space-x-6 w-full md:w-auto">
            {/* Dropdown for Categories */}
            <div className="flex flex-col items-center justify-center">
              <span className="mb-2 text-xl font-semibold text-gray-700">Filter Kategori</span>
              <div className="relative flex items-center">
                <select
                  className="border border-gray-300 rounded-full pl-6 pr-10 py-3 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all cursor-pointer text-gray-600 font-medium"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="absolute top-[18px] right-4 text-gray-500">
                  <FaChevronDown size={16} />
                </span>
              </div>
            </div>

            {/* Dropdown for Locations */}
            <div className="flex flex-col items-center justify-center">
              <span className="mb-2 text-xl font-semibold text-gray-700">Cari Lokasi</span>
              <input
                type="text"
                placeholder="Masukkan lokasi..."
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value.toLowerCase())}
                className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all w-full text-gray-600"
              />
            </div>

          </div>

          {/* Price Search */}
          <div className="relative flex flex-col items-center w-full md:w-auto">
            <span className="mb-2 text-xl font-semibold text-gray-700">Cari berdasarkan Harga</span>
            <input
              type="number"
              placeholder="Harga maksimal..."
              value={priceSearchTerm}
              onChange={(e) => setPriceSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-green-500 transition-all w-full md:w-80 text-gray-600"
            />
          </div>

          {/* Search by Name */}
          <div className="relative flex flex-col items-center w-full md:w-auto">
            <span className="mb-2 text-xl font-semibold text-gray-700">Cari Nama Kelas / Mitra</span>
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Cari Kelas ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-80 focus:outline-none focus:border-green-500 transition-all text-gray-600"
              />
              {/* Search Icon */}
              <span className="absolute right-4 text-green-500 hover:text-green-700 cursor-pointer">
                <FaSearch size={20} />
              </span>
            </div>
          </div>
        </div>


        {loading ? (
          <p className="text-center text-green-600 font-semibold">
            Loading classes...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-6">
            {filteredClasses.map((classInfo) => (
              <div
                key={classInfo.id}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300"
              >
                {/* Class Image */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <img
                    src={`/images/kelas/${classInfo.imagePath}`}
                    alt={classInfo.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h2 className="text-3xl text-white font-bold">
                      {classInfo.owner.name}
                    </h2>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4">
                    <h2 className="text-lg font-semibold truncate">
                      {classInfo.name}
                    </h2>
                    <p className="text-sm">{classInfo.trainer.name}</p>
                  </div>
                </div>

                {/* Class Details */}
                <div className="p-6 flex flex-col">
                  {/* Location */}
                  <p className="text-gray-700 text-sm flex items-center mb-4">
                    <span className="material-icons text-green-500 mr-2">
                      location_on
                    </span>
                    {classInfo.address}
                  </p>

                  {/* Schedule */}
                  {classInfo.schedules && classInfo.schedules.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 text-lg mb-2">
                        Jadwal Kelas:
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {classInfo.schedules.map((schedule, idx) => {
                          const time = schedule.jam.slice(0, 5); // Get only hour and minute
                          return (
                            <div
                              key={idx}
                              className="bg-gray-50 p-3 rounded-lg shadow-md flex items-center justify-center text-center"
                            >
                              <h6 className="text-blue-600 font-semibold text-sm">
                                {schedule.hari} - {time}
                              </h6>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <p className="text-green-700 font-semibold text-xl mb-6">
                    Harga: Rp {classInfo.price.toLocaleString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto flex justify-between items-center space-x-4">
                    <Link to={`/kelas/${classInfo.id}`}>
                      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                        Lihat Kelas
                      </button>
                    </Link>
                    <button
                      onClick={() => openPopup(classInfo)}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    >
                      Daftar Kelas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isPopupOpen && (
          <DaftarKelasPopup onClose={closePopup} classInfo={selectedClass} />
        )}
      </section>
    </>
  );
};

export default KelasPelatihan;
