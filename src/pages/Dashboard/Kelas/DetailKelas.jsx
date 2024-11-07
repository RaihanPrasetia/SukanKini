// src/pages/Dashboard/Kelas/DetailKelas.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';

const DetailKelas = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock class details
    const classDetails = {
        1: {
            title: "CARDIO",
            image: "/assets/images/kelascardio.jpg",
            description: "A full-body workout focused on cardiovascular health.",
            location: "Raffles Hotel Jakarta",
            hours: "06.00 - 22.00 WIB",
            price: "Mulai 200.000-an",
            pelatih: "Jhon Delux"
        },
        2: {
            title: "PEMBENTUKKAN OTOT",
            image: "/assets/images/gym.jpeg", // Use a different image for the second class
            description: "Strength training for building muscle and endurance.",
            location: "Abadi Suite Jambi",
            hours: "06.00 - 22.00 WIB",
            price: "Mulai 200.000-an",
        },
    };

    const classInfo = classDetails[id];

    return (
        <>
            <div className="flex flex-col pb-6 bg-gray-300">
                <div
                    className="flex justify-center items-center w-full px-16 relative mx-auto bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('${classInfo?.image}')`,
                        backgroundSize: "cover",
                        height: "50vh",
                    }}
                >
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="text-yellow-500 hover:text-yellow-700 mb-4 flex items-center text-2xl absolute top-10 left-16">
                        <AiOutlineLeft className="text-5xl" />
                    </button>

                    <h1 className="text-4xl font-bold text-white text-shadow-md text-center ">
                        {classInfo?.title}
                    </h1>
                </div>

                <div className='flex flex-col px-20 space-y-2'>
                    <div className="flex items-start justify-between w-full   space-x-20">
                        <div className="w-full flex flex-col items-end justify-center p-10 space-y-5">
                            <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-48 h-48 object-cover rounded-lg" />
                            <p className='text-black font-bold text-center'>
                                Pelatih : <span className='tfont-medium text-yellow-500'>{classInfo?.pelatih}</span>
                            </p>
                        </div>

                        <div className="flex flex-col w-full p-10">
                            <h1 className="text-2xl font-bold text-yellow-500">{classInfo?.title}</h1>
                            <p className="text-gray-700 mt-2">{classInfo?.description}</p>

                            <div className="flex justify-between items-center mt-4">
                                {/* Location and Hours on the left */}
                                <div className="flex flex-col">
                                    <p className="text-gray-600"><strong>Location:</strong> {classInfo?.location}</p>
                                    <p className="text-gray-600"><strong>Hours:</strong> {classInfo?.hours}</p>
                                    <p className="text-gray-600 font-semibold text-start">{classInfo?.price}</p>
                                </div>
                            </div>

                            {/* Register button */}
                            <div className="mt-6 flex justify-start">
                                <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                                    Daftar Kelas
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-3xl font-bold text-green-500 pb-3'>Daftar Kelas Lain</h1>
                    {/* Grid section with image and text in the center */}
                    <div className="w-full  grid grid-cols-3 gap-6 ">
                        {/* Image on the left */}
                        <div className="relative">
                            <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-full h-full object-cover rounded-lg" />
                            {/* Centered text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-6 text-center rounded-lg text-white">
                                    <p className="text-xl font-bold">{classInfo?.title}</p>
                                    <p className="text-sm">{classInfo?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-full h-full object-cover rounded-lg" />
                            {/* Centered text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-6 text-center rounded-lg text-white">
                                    <p className="text-xl font-bold">{classInfo?.title}</p>
                                    <p className="text-sm">{classInfo?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-full h-full object-cover rounded-lg" />
                            {/* Centered text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-6 text-center rounded-lg text-white">
                                    <p className="text-xl font-bold">{classInfo?.title}</p>
                                    <p className="text-sm">{classInfo?.description}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="py-6 flex justify-center ">
                        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                            Daftar Kelas
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DetailKelas;
