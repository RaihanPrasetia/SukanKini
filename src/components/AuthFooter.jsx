import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";

const AuthFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-10">
            <div className="container mx-auto px-6 flex flex-col items-center justify-between md:flex-row space-y-6 md:space-y-0">
                {/* Logo dan Nama Website */}
                <div className="flex flex-col items-center">
                    <img
                        src="/assets/images/Logo_SukanKini.png" // Ganti dengan path logo Anda
                        alt="Logo Sukan Kini"
                        className="w-32 h-32 object-cover"
                    />
                </div>

                {/* Navigasi */}
                <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:gap-6">
                    <Link to="/about" className="hover:text-green-400 transition duration-300">About Us</Link>
                    <Link to="/services" className="hover:text-green-400 transition duration-300">Services</Link>
                    <Link to="/contact" className="hover:text-green-400 transition duration-300">Contact</Link>
                </div>

                {/* Sosial Media Links */}
                <div className="flex gap-6 mt-4 md:mt-0">
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
            </div>

            {/* Copyright */}
            <div className="text-center mt-6 text-sm text-gray-200">
                <p>&copy; {new Date().getFullYear()} FitLife. Semua hak dilindungi.</p>
            </div>
        </footer>
    );
};

export default AuthFooter;
