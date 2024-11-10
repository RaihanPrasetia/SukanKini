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

    const textVariants = {
        hidden: { opacity: 0, x: 20, scale: 0.7 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-r pt-28 from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-5xl px-4 py-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <motion.button
                    className="text-yellow-400 text-2xl transform hover:scale-110 transition duration-300"
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                >
                    <i className="fas fa-arrow-left"></i>
                </motion.button>
                <motion.div className="flex items-center space-x-4" initial="hidden" animate="visible" variants={buttonVariants}>
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 md:px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition duration-300">
                        Berita & Pemberitahuan
                    </button>
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 md:px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition duration-300">
                        Tanya Komunitas
                    </button>
                </motion.div>
                <motion.div
                    className="relative w-full md:w-64"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <input
                        type="text"
                        placeholder="Cari Komunitas..."
                        className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    />
                </motion.div>
            </div>

            {/* Community Cards */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-12 px-4 pb-8">
                {communities.map((community, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-72 bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                    >
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-48 object-cover transition duration-300 hover:opacity-90"
                        />
                        <div className="p-6 text-center">
                            <motion.h2
                                className="text-2xl font-semibold text-gray-200"
                                initial="hidden"
                                animate="visible"
                                variants={textVariants}
                            >
                                {community.name}
                            </motion.h2>
                            <motion.button
                                className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                                initial="hidden"
                                animate="visible"
                                variants={buttonVariants}
                            >
                                Bergabung
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer or Additional Info */}
            <div className="mt-10 text-center px-4">
                <motion.p
                    className="text-gray-400 text-sm"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    Temukan komunitas yang tepat untuk Anda dan mulai perjalanan kebugaran Anda hari ini!
                </motion.p>
            </div>
        </div>
    );
};
