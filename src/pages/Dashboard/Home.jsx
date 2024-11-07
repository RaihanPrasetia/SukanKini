import React from 'react';
import { useAuth } from '../Layouts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { userName } = useAuth();

    return (
        <div
            className="flex flex-col bg-gray-100 items-start justify-start px-16 py-10"
            style={{
                backgroundImage: "url('/assets/images/dashboard.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",

            }}
        >

            {/* Background Overlay */}
            <div className="flex flex-col pb-10 w-full ">
                <h1 className="text-xl md:text-5xl font-bold text-green-500 w-full text-center">Dashboard</h1>
                <p className="mt-4 text-xl md:text-3xl font-semibold text-white w-full text-center">Hai, {userName || "Selamat Datang Kembali!"}</p>
                <p className="mt-2 text-sm md:text-base text-white w-full text-center">Ingin Olahraga Apa Hari ini?</p>
            </div>

            <div className="flex flex-col sm:flex-row space-x-5 justify-between w-full ">
                {/* Class Cards Section */}
                <div className="w-full sm:w-1/2 p-6 rounded-2xl   text-white">
                    <h2 className="text-2xl font-semibold mb-4">Kelas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
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
                        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
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
                    <button className="mt-8 px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-800 hover:shadow-xl transition duration-200">
                        <Link to='/kelas'>Lihat Kelas</Link>
                    </button>
                </div>

                {/* Community Section */}
                <div className="w-full sm:w-1/2 p-6 rounded-2xl   mt-6 sm:mt-0 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Komunitas</h2>
                    <div className="rounded-lg">
                        <p className="text-lg ">Bergabunglah dengan komunitas kami untuk berbagi pengalaman dan motivasi.</p>
                        <button className="mt-4 px-4 py-2 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-800 hover:shadow-xl transition duration-200">
                            Lihat Komunitas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
