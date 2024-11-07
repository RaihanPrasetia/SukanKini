import React from 'react';
import { useAuth } from '../Layouts/AuthContext';
import Komunitas from './Home/Komunitas';
import VideoTutorial from './Home/VideoTutorial';
import KelasHome from './Home/KelasHome';
import { FaArrowDown } from 'react-icons/fa';

export default function Home() {
    const { userName } = useAuth();

    // Scroll to Kelas section
    const scrollToKelas = () => {
        const kelasSection = document.getElementById("kelas");
        if (kelasSection) {
            window.scrollTo({
                top: kelasSection.offsetTop - 50, // Menggeser sedikit ke atas (50px)
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {/* hero section */}
            <section className="w-full min-h-[40vh]">
                <div
                    className="flex flex-col items-center justify-center px-16 py-10 h-screen bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/images/dashboard.jpg')",
                    }}
                >
                    <div className="flex flex-col items-center justify-center space-y-4 pb-10">
                        <p className="text-lg md:text-3xl text-start font-semibold text-white">
                            Hai, {userName || "Selamat Datang Kembali!"}
                        </p>
                        <h1 className="text-3xl mt-4  md:text-5xl font-bold text-white leading-tight">
                            Selamat Datang DI SukanKini
                        </h1>
                        <p className="mt-2 text-sm md:text-lg text-white opacity-80">
                            Banyak yang bisa kamu jelajahi! Temukan kelas-kelas baru, coba aktivitas seru, dan mulai gaya hidup sehat yang lebih menyenangkan!
                        </p>
                    </div>

                    {/* Bounce Button to Scroll to Kelas */}
                    <button
                        onClick={scrollToKelas}
                        className="absolute bottom-5 p-3 text-white bg-green-500 hover:bg-green-500  bg-opacity-40 border border-green-500 rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce"
                    >
                        <FaArrowDown size={18} /> {/* Ikon panah ke bawah */}
                    </button>
                </div>
            </section>

            <section id='kelas'>
                <KelasHome />
            </section>
            <section id='komunitas'>
                <Komunitas />
            </section>
            <section id='video'>
                <VideoTutorial />
            </section>
        </>
    );
}
