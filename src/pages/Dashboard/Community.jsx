import React from 'react';
import { motion } from 'framer-motion';

export default function Community() {
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 pt-28 text-white flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-6xl px-6 py-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <motion.button
                    className="text-yellow-400 text-3xl transform hover:scale-110 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                >
                    <i className="fas fa-arrow-left"></i>
                </motion.button>
                <motion.div
                    className="flex items-center space-x-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full shadow-xl hover:opacity-90 transition duration-300 transform hover:scale-105">
                        Berita & Pemberitahuan
                    </button>
                    <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full shadow-xl hover:opacity-90 transition duration-300 transform hover:scale-105">
                        Tanya Komunitas
                    </button>
                </motion.div>
                <motion.div
                    className="relative w-full md:w-72"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    <input
                        type="text"
                        placeholder="Cari Komunitas..."
                        className="w-full px-6 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 shadow-lg"
                    />
                </motion.div>
            </div>

            {/* Community Cards */}
            <motion.div
                className="flex flex-wrap justify-center gap-8 mt-12 px-4 pb-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {communities.map((community, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-80 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        variants={itemVariants}
                    >
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-60 object-cover transition duration-300 hover:opacity-90"
                        />
                        <div className="p-6 text-center">
                            <h2 className="text-3xl font-bold text-white">{community.name}</h2>
                            <motion.button
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                                whileHover={{ scale: 1.1 }}
                            >
                                Bergabung
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer */}
            <motion.div
                className="mt-12 text-center px-6"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
            >
                <p className="text-gray-300 text-lg">
                    Temukan komunitas yang tepat untuk Anda dan mulai perjalanan kebugaran Anda hari ini!
                </p>
            </motion.div>
        </div>
    );
}
