import React, { useState } from 'react';

function Pelatih() {
    const [activeCategory, setActiveCategory] = useState('Pelatih Populer');

    const categories = ['Pelatih Populer', 'Cardio', 'Dance', 'Mind & Body'];
    const communityCards = [
        { title: 'Yoga & Flexibilitas', image: 'https://cdn.shopify.com/s/files/1/0259/3665/8531/files/04-Blog-Eye-of-the-needle.jpg' },
        { title: 'Pembentukan Otot', image: 'https://d324bm9stwnv8c.cloudfront.net/article/20180919193248.2961461548584.png' },
        { title: 'Cardio', image: 'https://www.puregym.com/media/3f1pvvjw/the-best-gym-cardio-workouts_blogheader-notitle.jpg?quality=80' }
    ];

    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/background-image.jpg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-left mb-10">
                    <h1 className="text-4xl font-bold text-yellow-500">PELATIH YANG PROFESIONAL</h1>
                    <p className="text-white mt-4 max-w-md">
                        Disini kami menyediakan trainers yang berpengalaman dan berkualifikasi. Kalian bisa memilih pelatih sesuai kelas yang kalian ikuti.
                    </p>
                    <button className="mt-6 px-6 py-2 text-green-700 bg-white rounded-full hover:bg-gray-100">
                        Lihat Semua Pelatih
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex space-x-6 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-lg font-semibold ${activeCategory === category ? 'text-green-600' : 'text-gray-300'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Community Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {communityCards.map((card, index) => (
                        <div key={index} className="relative">
                            <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0"></div>
                            <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">{card.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pelatih;
