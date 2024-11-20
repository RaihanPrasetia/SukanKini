import React, { useState } from "react";

const categories = [
  {
    title: "Dance",
    image:
      "https://images.unsplash.com/photo-1505527385992-63e06a393342?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Pembentukan Otot",
    image:
      "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Yoga & Fleksibilitas",
    image:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Relaksasi",
    image:
      "https://images.unsplash.com/photo-1611566620327-5e879d9b0955?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const VideoCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on the search term
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="relative flex flex-col items-center min-h-screen pt-28 pb-20 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1716307043003-dbe6a5cc496e?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-400">
          Semua Kategori Video
        </h1>

        {/* Search Input */}
        <div className="w-full flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Cari Kelas"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600">
              🔍
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg group transform hover:scale-105 transition-transform duration-300 bg-gray-800"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="text-white text-5xl font-semibold">
                    ▶️
                  </button>
                </div>
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-center text-lg font-semibold text-white">
                  {category.title}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg text-center">
              Kategori tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCategory;
