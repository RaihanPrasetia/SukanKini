import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-16">
            <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Logo and Slogan */}
                <div className="col-span-1">
                    <img src="https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png"
                        alt="SukanKini FitLife Logo" className="mb-4" />
                    <h2 className="font-bold text-xl">SUKANKINI FITLIFE TAU YANG TERBAIK UNTUK HIDUP SEHAT ANDA</h2>
                </div>

                {/* Links Section */}
                <div className='px-10'>
                    <h3 className="font-semibold text-green-500 mb-3">Dapatkan latihan</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Membership</a></li>
                        <li><a href="#" className="hover:underline">Video latihan</a></li>
                        <li><a href="#" className="hover:underline">Kelas</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                    </ul>
                </div>

                <div className='px-10'>
                    <h3 className="font-semibold text-green-500 mb-3">Kunjungi</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Jadwal Kelas</a></li>
                        <li><a href="#" className="hover:underline">Lokasi Kebugaran</a></li>
                        <li><a href="#" className="hover:underline">Fasilitas</a></li>
                    </ul>
                </div>

                <div className='px-10'>
                    <h3 className="font-semibold text-green-500 mb-3">Kenali Kami</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Tentang Kami</a></li>
                        <li><a href="#" className="hover:underline">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Karir</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <h3 className="font-semibold">Layanan Pengaduan Konsumen</h3>
                    <p>PT Gajah Mada Properti<br />Jambi Timur, Lt. 3, Jl. Jendral Sudirman, Kenali Asam, Provinsi Jambi, Kota
                        Jambi</p>
                    <p>WhatsApp: 0856 8892 8272<br />Nomor Telepon: 021 2736 7126<br />Email: SukanKiniFitLife@gmail.com</p>
                </div>

                {/* Operational Hours */}
                <div>
                    <h3 className="font-semibold">Jam Operasional</h3>
                    <p>Senin-Jumat: 06:00 - 23:00<br />Sabtu: 06:00 - 21:00<br />Libur Nasional: 08:00 - 20:00</p>
                </div>

                {/* Social Media Links */}
                <div className="col-span-1 flex space-x-4 justify-center">
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="#" className="text-green-500 hover:text-white">
                        <FontAwesomeIcon icon={faTiktok} size="lg" />
                    </a>
                </div>

            </div>

            {/* Copyright */}
            <div className="text-center mt-8">
                <p>© Copyright PT. GajahMada Properti. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;