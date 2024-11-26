import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo_SukanKini.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 lg:px-20 px-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 text-center sm:text-left">

                {/* Logo and Slogan */}
                <div className="flex flex-col items-center sm:items-start space-y-3">
                    <img src={logo} alt="SukanKini FitLife Logo" className="w-40 h-32 object-cover " />
                    <p className="text-sm text-gray-400">Tau yang terbaik untuk hidup sehat Anda.</p>
                </div>



                <div className="space-y-6 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Dapatkan Latihan</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-green-500">Membership</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Video Latihan</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Kelas</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Blog</Link></li>
                    </ul>
                </div>

                <div className="space-y-6 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Kunjungi</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-green-500">Jadwal Kelas</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Lokasi Kebugaran</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Fasilitas</Link></li>
                    </ul>
                </div>

                <div className="space-y-6 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Kenali Kami</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-green-500">Tentang Kami</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Syarat & Ketentuan</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Kebijakan Privasi</Link></li>
                        <li><Link to="#" className="hover:text-green-500">FAQs</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Karir</Link></li>
                    </ul>
                </div>

                <div className="space-y-6 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold text-green-500">Terbaru</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-green-500">Semua Artikel</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Tips</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Event</Link></li>
                        <li><Link to="#" className="hover:text-green-500">Featured</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="md:col-span-2 lg:col-span-2 space-y-6 text-center sm:text-left">
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
                <div className="space-y-6 flex flex-col lg:col-span-2 items-center sm:items-start">
                    <h3 className="text-lg font-semibold">Jam Operasional</h3>
                    <p className="text-sm text-gray-400">
                        Senin-Jumat: 06:00 - 23:00 <br />
                        Sabtu: 06:00 - 21:00 <br />
                        Libur Nasional: 08:00 - 20:00
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex lg:justify-start justify-center items-start space-x-6 mt-8">
                    <Link to="#" className="text-pink-500 hover:text-pink-700">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </Link>
                    <Link to="#" className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-200">
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </Link>
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
