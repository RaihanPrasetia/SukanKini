import React from "react";
import { Link } from 'react-router-dom';

const KelasHome = () => {

    const handleMenuClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };
    return (
        <>
            {/* Explore Classes Section */}
            <div className="w-full lg:px-20 lg:py-16 p-6 bg-white">
                <div className="w-full text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 transition-transform duration-500 transform hover:scale-105">
                        Jelajahi Semua Kelas
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg md:text-xl transition-opacity duration-300 hover:opacity-80">
                        Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
                    </p>
                </div>

                {/* Categories Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:flex md:flex-wrap md:justify-center mt-8">
                    {['Semua', 'Dance', 'Cardio', 'Strength'].map((category) => (
                        <button
                            key={category}
                            className="px-6 py-3 border-2 border-green-500 text-green-700 rounded-xl hover:bg-green-500 hover:text-white transition duration-300 transform hover:scale-105 shadow-md"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Classes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
                    {/* Card 1 */}
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Zumba"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold py-4 text-center">
                            Zumba
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1706029831405-619b27e3260c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Pembentukan Otot"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold py-4 text-center">
                            Pembentukan Otot
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center mt-8">
                    <button className="px-5 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-white hover:text-green-500 hover:shadow-xl transition duration-200">
                        <Link
                            onClick={handleMenuClick}
                            to='/kelas'>Lihat Kelas</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default KelasHome