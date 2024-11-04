import React from 'react';
import { useAuth } from '../Layouts/AuthContext';

const Home = () => {
    const { userName } = useAuth();
    return (
        <div className="text-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
            {/* Dashboard Navbar */}

            {/* Dashboard Content */}
            <main
                className="px-8 py-10 min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1728486144678-95cb7c5f7463?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            >
                <div
                    className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl max-w-full h-[80vh] mx-auto flex flex-col justify-between items-center"
                >
                    <div>
<<<<<<< HEAD
                        <h1 className="text-4xl font-bold text-indigo-800">Dashboard</h1>
                        <p className="mt-4 text-2xl text-yellow-500 font-semibold">Hai, Selamat Datang Kembali!</p>
=======
                        <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
                        <p className="mt-4 text-xl text-yellow-500 font-semibold">Hai, Selamat Datang Kembali, {userName}! </p>
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6
                        <p className="mt-2 text-lg text-gray-700">Ingin Olahraga Apa Hari ini?</p>
                    </div>

                    {/* Class Cards */}
                    <div className="flex justify-center gap-10 mt-8 flex-grow">
                        <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Zumba"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold py-4 text-center">
                                Zumba
                            </div>
                        </div>
                        <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1706029831405-619b27e3260c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Pembentukan Otot"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold py-4 text-center">
                                Pembentukan Otot
                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-8 px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-800 hover:shadow-xl transition duration-200">
                        Lihat Kelas
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;
