import React from 'react';
import { Link } from 'react-router-dom';

function Komunitas() {
    return (
        <div className="w-full flex flex-col justify-center items-center  py-20 px-4 lg:px-20 ">
            {/* Header Section */}
            <div className="flex flex-col w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-green-600">Temukan Komunitas yang Anda Minati</h1>
                    <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
                        Mulailah berinteraksi bersama komunitas yang sesuai dengan diri Anda! Ciptakan pengalaman seru dalam perjalanan aktivitas produktif Anda!
                    </p>
                </div>
                {/* Category Tabs */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-600">Kategori Komunitas</h2>
                    <div className="flex flex-wrap justify-center mt-6">
                        {['Pembentukan Otot', 'Atletik', 'Cardio', 'Yoga & Flexibilitas', 'Relaksasi'].map((category) => (
                            <button key={category}
                                className="mr-4 mb-4 px-4 py-2 border border-green-500 text-green-700 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-200">
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {/* Community Images with Hover Effect */}
                    {[
                        {
                            src: "https://miniletics.com/cdn/shop/articles/hormon-memengaruhi-pembentukan-otot-0.jpg?v=1657253255",
                            title: "Komunitas Pembentukan Otot",
                        },
                        {
                            src: "https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg",
                            title: "Komunitas Atletik",
                        },
                        {
                            src: "https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg",
                            title: "Komunitas Cardio",
                        },
                        {
                            src: "https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg",
                            title: "Komunitas Yoga & Flexibilitas",
                        },
                    ].map((community, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                            <img
                                src={community.src}
                                alt={community.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg"></div>
                            <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">{community.title}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to={'#'} className="text-xl bg-gradient-to-r from-green-500 to-blue-500 py-3 px-6 rounded-xl text-white font-semibold shadow-lg hover:from-blue-500 hover:to-green-500 transition duration-300 ease-in-out transform hover:scale-105">
                        Semua Komunitas
                    </Link>
                </div>

                {/* Link with Enhanced Style */}
            </div>
        </div>
    );
}

export default Komunitas;
