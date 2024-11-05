import React from 'react';
import { useAuth } from '../Layouts/AuthContext';

const Home = () => {
    const { userName } = useAuth();
    return (
        <div className="text-center flex items-center justify-start"
            style={{
                backgroundImage: "url('/assets/images/dashboard.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh", // Adjust height as needed
            }}
        >
            <div className="absolute top-16 inset-0 h-[80vh] bg-black bg-opacity-50"></div>
            {/* Background Image */}
            <div className="relative w-full p-10 rounded-2xl shadow-2xl text-white">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-4 text-xl font-semibold">Hai, Selamat Datang Kembali!</p>
                <p className="mt-2 text-lg">Ingin Olahraga Apa Hari ini?</p>
            </div>
            <div className="relative w-full p-10 rounded-2xl shadow-2xl text-white">
                <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl w-11/12 max-w-4xl mx-auto flex flex-col justify-between items-center">
                    {/* Class Cards Section */}
                    <div className="flex justify-center gap-6 mt-8">
                        {/* Card 1 */}
                        <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
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
                        <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
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
                        Lihat Kelas
                    </button>
                </div>
            </div>


        </div>

    );
};

export default Home;
