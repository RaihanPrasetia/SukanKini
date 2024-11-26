import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";

const AuthFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-10">
            <div className="container flex flex-col items-center justify-between md:flex-row space-y-6 md:space-y-0">
                {/* Logo dan Nama Website */}
                <div className="flex flex-col items-center w-full justify-between">
                    <h1 className="text-yellow-500 text-[50px] font-bold">Sukan<span className="text-white">Kini</span></h1>
                    <span className="text-[20px] font-semibold">Untuk Hidup Lebih Produktif!</span>
                </div>
                <div className="flex gap-12 mt-4 md:mt-0 w-full items-center justify-center">
                    <Link to="#" className="text-pink-500 hover:text-pink-700 transition duration-300">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </Link>
                    <Link to="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-200 transition duration-300">
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </Link>
                </div>
                <div className="flex flex-col items-center space-y-2 text-green-500 text-lg font-bold md:space-y-0 md:gap-6 w-full justify-center">
                    <Link to="/about" className="hover:text-green-400 transition duration-300">Beranda</Link>
                    <Link to="/services" className="hover:text-green-400 transition duration-300">Tim Saya</Link>
                    <Link to="/contact" className="hover:text-green-400 transition duration-300">Tentang Kami</Link>
                </div>


            </div>

            <div className="text-center mt-6 text-sm text-gray-200">
                <p>&copy; {new Date().getFullYear()} FitLife. Semua hak dilindungi.</p>
            </div>
        </footer>
    );
};

export default AuthFooter;
