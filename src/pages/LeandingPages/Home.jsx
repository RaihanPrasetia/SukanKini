import React from 'react';

export default function Home() {

    return (
        <>
            <div className="relative bg-cover bg-center min-h-screen flex items-center justify-start px-36 " style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative text-left text-white max-w-2xl ">
                    <h1 className="text-5xl font-bold mb-4">
                        SELAMAT DATANG <br /> DI SUKANKINI! FITLIFE!
                    </h1>
                    <p className="text-lg mb-8">
                        Transformasi Hidup Produktif! Temukan inspirasi, tantangan, dan pengetahuan untuk mencapai kesehatan & kebugaran yang optimal.
                    </p>

                    <div className="flex items-center space-x-4 mb-8">
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-white hover:text-green-500 transition duration-300">
                            Gabung Sekarang
                        </button>

                        <button
                            className="flex items-center text-white bg-transparent border-2 border-white py-2 px-6 rounded-xl hover:bg-white hover:text-blue-800 transition duration-300">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                            Putar Video
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


