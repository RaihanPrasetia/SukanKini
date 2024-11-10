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
            image: "/assets/images/kelasuser/cardio.jpg",
            description: "A full-body workout focused on cardiovascular health.",
            location: "Raffles Hotel Jakarta",
            hours: "06.00 - 22.00 WIB",
            price: "Mulai 200.000-an",
            pelatih: "Jhon Delux"
        },
        2: {
            title: "PEMBENTUKKAN OTOT",
            image: "/assets/images/kelasuser/otot.jpg",
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
                    className="flex justify-center items-center w-full px-4 md:px-16 relative mx-auto bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('${classInfo?.image}')`,
                        backgroundSize: "cover",
                        height: "40vh",
                    }}
                >
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="text-yellow-500 hover:text-yellow-700 mb-4 flex items-center text-2xl absolute lg:top-4 bottom-4 md:top-10 left-4 md:left-16">
                        <AiOutlineLeft className="text-3xl md:text-5xl" />
                    </button>

                    <h1 className="text-2xl md:text-4xl font-bold text-white text-shadow-md text-center">
                        {classInfo?.title}
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row px-4 md:px-20 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-10 space-y-4">
                        <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg" />
                        <p className="text-black font-bold text-center">
                            Pelatih : <span className="font-medium text-yellow-500">{classInfo?.pelatih}</span>
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col p-4 md:p-10">
                        <h1 className="text-xl md:text-2xl font-bold text-yellow-500">{classInfo?.title}</h1>
                        <p className="text-gray-700 mt-2">{classInfo?.description}</p>

                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-4 space-y-2 md:space-y-0">
                            <div>
                                <p className="text-gray-600"><strong>Location:</strong> {classInfo?.location}</p>
                                <p className="text-gray-600"><strong>Hours:</strong> {classInfo?.hours}</p>
                                <p className="text-gray-600 font-semibold">{classInfo?.price}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-start">
                            <button className="bg-yellow-500 text-white px-4 py-2 text-lg font-semibold rounded-lg shadow hover:bg-yellow-600 transition">
                                Daftar Kelas
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-20 py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-green-500 pb-3">Daftar Kelas Lain</h1>

                    {/* Grid section with image and text in the center */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="relative">
                                <img src={classInfo?.image || "/assets/images/gym.jpeg"} alt={classInfo?.title} className="w-full h-40 md:h-full object-cover rounded-lg" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="p-4 md:p-6 text-center rounded-lg text-white">
                                        <p className="text-lg md:text-xl font-bold">{classInfo?.title}</p>
                                        <p className="text-sm md:text-base">{classInfo?.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-6 flex justify-center">
                        <button className="bg-yellow-500 text-white px-4 text-lg font-semibold md:px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                            Lihat Kelas Lain
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailKelas;
