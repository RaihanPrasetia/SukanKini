import React from 'react';

const VideoTutorial = () => {
    // Data array untuk video
    const videos = [
        { title: 'Yoga Basics', thumbnailUrl: '/assets/images/kelasuser/yoga kelas.jpg', link: '/videos/yoga-basics' },
        { title: 'Cardio Intensity', thumbnailUrl: '/assets/images/kelasuser/spinning.jpg', link: '/videos/cardio-intensity' },
        { title: 'Strength Training', thumbnailUrl: 'https://via.placeholder.com/500x300.png?text=Strength+Training', link: '/videos/strength-training' },
        { title: 'Dance Moves', thumbnailUrl: 'https://via.placeholder.com/500x300.png?text=Dance+Moves', link: '/videos/dance-moves' },
        { title: 'Mindfulness Techniques', thumbnailUrl: 'https://via.placeholder.com/500x300.png?text=Mindfulness+Techniques', link: '/videos/mindfulness-techniques' },
        // Tambahkan lebih banyak video jika diperlukan
    ];

    return (
        <section className="w-full lg:px-20 lg:py-16 p-6 bg-white">
            <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 transition-transform duration-500 transform hover:scale-105">
                    Video Tutorial
                </h2>
                <p className="text-gray-600 mt-2 text-lg md:text-xl transition-opacity duration-300 hover:opacity-80">
                    Pelajari langkah-langkah penting untuk mencapai tujuan Anda.
                </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                        <a href={video.link} className="relative block w-full h-full">
                            <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div className="absolute bottom-0 w-full text-white text-lg font-semibold py-4 text-center bg-gradient-to-t from-black to-transparent">
                                {video.title}
                            </div>
                        </a>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-12">
                <button className="px-6 py-3 bg-green-600 text-lg text-white font-semibold rounded-full shadow-xl hover:opacity-90 transform transition-all duration-300">
                    <a href="/video-tutorials">Lihat Semua Video</a>
                </button>
            </div>
        </section>
    );
};

export default VideoTutorial;
