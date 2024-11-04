import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 lg:px-20 px-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">

                {/* Logo and Slogan */}
                <div className="flex flex-col items-center sm:items-start space-y-3">
                    <img
                        src="https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png"
                        alt="SukanKini FitLife Logo"
                        className="w-20 h-20 object-cover mb-3"
                    />
                    <h2 className="text-2xl font-bold text-green-500">
                        SUKANKINI FITLIFE
                    </h2>
                    <p className="text-sm text-gray-400">
                        Tau yang terbaik untuk hidup sehat Anda.
                    </p>
                </div>

                {/* Links Section */}
                <div className="space-y-4 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Dapatkan Latihan</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-green-500">Membership</a></li>
                        <li><a href="#" className="hover:text-green-500">Video Latihan</a></li>
                        <li><a href="#" className="hover:text-green-500">Kelas</a></li>
                        <li><a href="#" className="hover:text-green-500">Blog</a></li>
                    </ul>
                </div>

                <div className="space-y-4 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Kunjungi</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-green-500">Jadwal Kelas</a></li>
                        <li><a href="#" className="hover:text-green-500">Lokasi Kebugaran</a></li>
                        <li><a href="#" className="hover:text-green-500">Fasilitas</a></li>
                    </ul>
                </div>

                <div className="space-y-4 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Kenali Kami</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-green-500">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-green-500">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-green-500">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-green-500">FAQs</a></li>
                        <li><a href="#" className="hover:text-green-500">Karir</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="md:col-span-2 lg:col-span-2 space-y-4 text-center sm:text-left">
                    <h3 className="text-lg font-semibold">Layanan Pengaduan Konsumen</h3>
                    <p className="text-sm text-gray-400">
                        PT Gajah Mada Properti <br />
                        Jambi Timur, Lt. 3, Jl. Jendral Sudirman, Kenali Asam, Provinsi Jambi, Kota Jambi
                    </p>
                    <p className="text-sm text-gray-400">
                        WhatsApp: 0856 8892 8272 <br />
                        Telepon: 021 2736 7126 <br />
                        Email: SukanKiniFitLife@gmail.com
                    </p>
                </div>

                {/* Operational Hours */}
                <div className="space-y-4 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold">Jam Operasional</h3>
                    <p className="text-sm text-gray-400">
                        Senin-Jumat: 06:00 - 23:00 <br />
                        Sabtu: 06:00 - 21:00 <br />
                        Libur Nasional: 08:00 - 20:00
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center items-center space-x-6 mt-8">
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-12 text-sm text-gray-500">
                © {new Date().getFullYear()} PT. Gajah Mada Properti. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
