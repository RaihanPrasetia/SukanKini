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
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen"> {/* Center the main content */}
      <h1 className="text-3xl font-semibold mb-6 text-green-800">Semua Kategori Video</h1>

      {/* Search Input */}
      <div className="relative flex items-center w-full md:w-auto mb-4"> {/* Keep search input aligned left */}
        <div className="flex justify-start w-full mb-4 relative"> {/* Set relative positioning for the button */}
          <input
            type="text"
            placeholder="Cari Kelas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-80 focus:outline-none focus:border-green-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700"> {/* Adjust the button's position */}
            🔍
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl w-full"> {/* Centered grid */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-60 object-cover rounded-xl"
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
