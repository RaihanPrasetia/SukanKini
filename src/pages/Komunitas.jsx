import React from 'react';
import { Link } from 'react-router-dom';

function Komunitas() {
    return (
        <div className="w-full flex flex-col justify-center px-36  items-center bg-slate-50 py-10 rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="flex flex-col w-full space-y-5">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-yellow-600">Temukan Komunitas yang Anda Minati</h1>
                    <p className="text-gray-700 mt-4">
                        Mulailah Berinteraksi Bersama Komunitas Yang Sesuai Dengan Diri Anda! Dan Ciptakan Pengalaman Seru Anda
                        Dalam Perjalanan Melakukan Aktivitas Produktif!
                    </p>
                </div>
                {/* Category Tabs */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-green-600">Kategori Komunitas</h2>
                    <div className="flex flex-wrap mt-4">
                        {['Pembentukan Otot', 'Atletik', 'Cardio', 'Yoga & Flexibilitas', 'Relaksasi'].map((category) => (
                            <button key={category}
                                className="mr-4 mb-4 px-4 py-2 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition">
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {/* Replace with images of popular communities */}
                    <div className="relative">
                        <img
                            src="https://miniletics.com/cdn/shop/articles/hormon-memengaruhi-pembentukan-otot-0.jpg?v=1657253255"
                            alt="Pembentukan Otot"
                            className="w-full h-80 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Pembentukan Otot</p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg"
                            alt="Relaksasi"
                            className="w-full h-80 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Relaksasi</p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg"
                            alt="Relaksasi"
                            className="w-full h-80 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Relaksasi</p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg"
                            alt="Relaksasi"
                            className="w-full h-80 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Relaksasi</p>
                    </div>
                    {/* Add more images as needed */}
                </div>

                {/* Link with tight width */}
                <div className=' text-center'>
                    <Link to={'#'} className="text-xl text-center bg-green-500 py-2 px-4 rounded-xl text-white  inline-block">
                        Lihat Komunitas
                    </Link>
                </div>

            </div>

            {/* Community Cards Section */}
            <div>

            </div>


        </div>
    );
}

export default Komunitas;