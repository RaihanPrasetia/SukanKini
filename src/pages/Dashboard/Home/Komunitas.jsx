import React from 'react';

const Komunitas = () => {
    return (
        <section className="w-full lg:px-20 lg:py-16 p-6 bg-white">
            <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4 transition-transform duration-300 hover:scale-105">
                    Komunitas
                </h2>
                <p className="text-lg sm:text-xl font-medium text-gray-800 opacity-90">
                    Bergabunglah dengan komunitas kami untuk berbagi pengalaman, belajar bersama, dan mendapatkan motivasi untuk
                    mencapai tujuan hidup sehat. Temukan dukungan dan semangat di setiap langkah perjalanan kebugaran Anda.
                </p>
                <p className="text-lg sm:text-xl font-medium text-gray-800 opacity-90">
                    Kami menyediakan ruang yang aman dan menyenangkan untuk semua anggota, di mana Anda dapat berbagi pengetahuan,
                    berinteraksi dengan orang lain yang memiliki minat yang sama, dan berkembang bersama menuju kehidupan yang lebih
                    sehat. Jangan ragu untuk bergabung dan menjadi bagian dari komunitas kami yang penuh semangat!
                </p>
                <div className="flex justify-center mt-8">
                    <button className="px-8 py-4 bg-green-600 text-white font-semibold text-xl rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500">
                        Lihat Komunitas
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Komunitas;
