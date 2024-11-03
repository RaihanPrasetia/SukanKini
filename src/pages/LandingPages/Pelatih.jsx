import React, { useState } from 'react';

function Pelatih() {
    const [activeCategory, setActiveCategory] = useState('Pelatih Populer');

    const categories = ['Pelatih Populer', 'Cardio', 'Dance', 'Mind & Body'];
    const communityCards = [
        { id: 1, title: 'Yoga & Flexibilitas', image: 'https://cdn.shopify.com/s/files/1/0259/3665/8531/files/04-Blog-Eye-of-the-needle.jpg' },
        { id: 2, title: 'Pembentukan Otot', image: 'https://d324bm9stwnv8c.cloudfront.net/article/20180919193248.2961461548584.png' },
        { id: 3, title: 'Cardio', image: 'https://www.puregym.com/media/3f1pvvjw/the-best-gym-cardio-workouts_blogheader-notitle.jpg?quality=80' }
    ];

    return (
        <div className=" w-full bg-cover bg-center flex items-center justify-center flex-col bg-slate-50 shadow-lg border-2 px-16 py-20">
            {/* Content */}
            <div className="p-8 mx-auto space-y-5">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600">PELATIH YANG PROFESIONAL</h1>
                    <p className="text-white mt-4 ">
                        Disini kami menyediakan trainers yang berpengalaman dan berkualifikasi. Kalian bisa memilih pelatih sesuai kelas yang kalian ikuti.
                    </p>


                </div>

                {/* Category Tabs */}
                <div className="flex space-x-6 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-lg font-semibold  px-4 py-2 border rounded-xl ${activeCategory === category ? 'text-white hover:text-green-500 bg-green-500 hover:bg-white ' : 'text-green-500 hover:text-white bg-white hover:bg-green-500 '}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Community Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {communityCards.map((card) => (
                        <div key={card.id} className="relative">
                            <img src={card.image} alt={card.title} className="w-full h-96 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0"></div>
                            <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">{card.title}</p>
                        </div>
                    ))}
                </div>

            </div>
            <button className="mt-6 px-6 py-2 text-white bg-green-600 rounded-xl hover:bg-white hover:text-green-600 text-center">
                Lihat Semua Pelatih
            </button>
        </div>
    );
}

export default Pelatih;
