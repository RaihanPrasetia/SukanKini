import React, { useState } from 'react';

const categories = [
  { title: "Dance", image: "https://images.unsplash.com/photo-1505527385992-63e06a393342?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Pembentukan Otot", image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Yoga & Fleksibilitas", image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Relaksasi", image: "https://images.unsplash.com/photo-1611566620327-5e879d9b0955?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const VideoCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center pt-28 pb-20 bg-gray-50 min-h-screen"> {/* Center the main content */}
      <h1 className="text-3xl font-semibold mb-6 text-green-800 text-center">Semua Kategori Video</h1>

      {/* Search Input */}
      <div className="w-full flex justify-center mb-8 px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Cari Kelas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:border-green-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700">
            🔍
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="text-white text-5xl font-semibold opacity-90">
                  ▶️
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white text-center font-semibold text-lg">
                {category.title}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Kategori tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default VideoCategory;
