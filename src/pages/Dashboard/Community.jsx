import React from 'react';

const Community = () => {
    const communities = [
        {
            name: 'Komunitas Relaksasi',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            name: 'Komunitas Yoga',
            image: 'https://images.unsplash.com/photo-1551624364-d6aa08657ea2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            name: 'Komunitas Zumba',
            image: 'https://images.unsplash.com/photo-1584584971830-0877df9ccaa3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-5xl px-4 py-4 flex items-center justify-between">
                <button className="text-yellow-400 text-2xl transform hover:scale-110 transition duration-300">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className="flex items-center space-x-4">
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition duration-300">
                        Berita & Pemberitahuan
                    </button>
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition duration-300">
                        Tanya Komunitas
                    </button>
                </div>
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Cari Komunitas..."
                        className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    />
                </div>
            </div>

            {/* Community Cards */}
            <div className="flex space-x-8 mt-12 overflow-x-auto px-4 pb-8">
                {communities.map((community, index) => (
                    <div
                        key={index}
                        className="w-72 bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-48 object-cover transition duration-300 hover:opacity-90"
                        />
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-200">{community.name}</h2>
                            <button className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
                                Bergabung
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer or Additional Info */}
            <div className="mt-10 text-center">
                <p className="text-gray-400 text-sm">
                    Temukan komunitas yang tepat untuk Anda dan mulai perjalanan kebugaran Anda hari ini!
                </p>
            </div>
        </div>
    );
};

export default Community;
