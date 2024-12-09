import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import VideoTutorial from "./Home/VideoTutorial";
import KelasHome from "./Home/KelasHome";
import { FaArrowDown } from "react-icons/fa";

export default function Home() {
  const { userName } = useAuth();

  const scrollToKelas = () => {
    const kelasSection = document.getElementById("kelas");
    if (kelasSection) {
      window.scrollTo({
        top: kelasSection.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };



  return (
    <>

      <section className="relative w-full bg-cover bg-center overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-screen px-8 py-16 md:px-16 md:py-24 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1621427380075-ae3e4fcc5333?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}>
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

          <div className="relative z-10 text-center space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Hai, {userName || "Selamat Datang Kembali!"}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Selamat Datang Di SukanKini
            </h1>
            <p className="mt-2 text-md sm:text-lg md:text-xl opacity-90 text-white">
              Temukan kelas-kelas baru, aktivitas seru, dan gaya hidup sehat
              yang lebih menyenangkan!
            </p>
          </div>

          <button onClick={scrollToKelas}
            className="absolute bottom-5 p-3 text-white bg-green-500 hover:bg-green-600 bg-opacity-75 border border-green-500 rounded-full font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none animate-bounce">
            <FaArrowDown size={18} /> {/* Ikon panah ke bawah */}
          </button>
        </div>
      </section>

      <section id="kelas" className="py-16 bg-gray-100">
        <KelasHome />
      </section>
      <section id="video" className="py-16 bg-gray-200">
        <VideoTutorial />
      </section>
    </>
  );
}
