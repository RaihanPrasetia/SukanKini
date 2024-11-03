import React from 'react';
import { FaUserCheck, FaVideo, FaClock } from 'react-icons/fa';

function About() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white">
            <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-6">KENAPA HARUS KAMI?</h1>
                <p className="text-center text-gray-700 mb-8">
                    Kami punya segala yang Anda butuhkan untuk mencapai tujuan kesehatan Anda.
                    Bergabunglah dengan komunitas yang mendukung dan nikmati program khusus yang
                    dirancang hanya untuk Anda.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Section */}
                    <div className="flex items-start">
                        <FaUserCheck className="text-green-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-green-700">Program Khusus</h2>
                            <p className="text-gray-700">
                                Program latihan yang disesuaikandengan kebutuhan individu, memastikan setiap anggota
                                mendapatkan perhatian dan rencana yang sesuai.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <FaUserCheck className="text-green-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-green-700">Kualifikasi Pelatih</h2>
                            <p className="text-gray-700">
                                Tim pelatih kami memiliki kualifikasi tinggi dan pengalaman bertahun-tahun untuk
                                membantu Anda mencapai tujuan kebugaran Anda.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-start">
                        <FaVideo className="text-green-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-green-700">Video Tutorial</h2>
                            <p className="text-gray-700">
                                Kami menyediakan video tutorial untuk tontonan Anda yang mungkin dapat membantu
                                Anda dalam melakukan aktivitas kebugaran jasmani yang Anda inginkan.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <FaClock className="text-green-600 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-green-700">Jam Operasional</h2>
                            <p className="text-gray-700">
                                Kami buka dari jam 6 pagi hingga 10 malam setiap hari, sehingga Anda bisa berlatih
                                kapan saja sesuai dengan jadwal Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
