// VideoTutorial.js
import React from 'react';

const VideoTutorial = () => {
    return (
        <section className="w-full px-20 py-16 bg-white">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-green-600 transition-transform duration-500 transform hover:scale-105">
                    Video Tutorial
                </h2>
                <p className="text-gray-600 mt-2 text-lg md:text-xl transition-opacity duration-300 hover:opacity-80">
                    Pelajari langkah-langkah penting untuk mencapai tujuan Anda.
                </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                {['Yoga Basics', 'Cardio Intensity', 'Strength Training', 'Dance Moves', 'Mindfulness Techniques'].map((videoTitle, index) => (
                    <div key={index} className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <img
                            src={`https://via.placeholder.com/500x300.png?text=${videoTitle.replace(/\s+/g, '+')}`}
                            alt={videoTitle}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold py-4 text-center">
                            {videoTitle}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-8">
                <button className="px-10 py-4 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-800 hover:shadow-xl transition duration-200">
                    <a href="/video-tutorials">Lihat Semua Video</a>
                </button>
            </div>
        </section>
    );
};

export default VideoTutorial;
