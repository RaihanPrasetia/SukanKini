import React from 'react';
import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const CardTeam = ({ name, age, university, job, city, motto, socialLinks }) => {
    return (
        <div className="w-[350px] h-auto flex flex-col justify-start bg-gray-200 items-center relative  rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 text-black">
            {/* Profile Picture */}
            <div className="w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden shadow-md">
                <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Job and Name */}
            <h1 className="mt-4 text-xl font-bold">{job}</h1>
            <h2 className="text-lg text-gray-800">{name}</h2>
            <div className='flex gap-2 absolute top-2 left-10'>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
            </div>
            <div className='flex gap-2 absolute top-2 right-10'>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
                <div className='bg-green-500 rounded-full h-4 w-4 border-2 border-white'></div>
            </div>
            <div className='flex flex-col gap-2 absolute left-0 top-16'>
                <div className='bg-green-500 rounded-r-full h-4 w-24 border-r-2 border-white'></div>
                <div className='bg-green-500 rounded-r-full h-4 w-20 border-r-2 border-white'></div>
                <div className='bg-green-500 rounded-r-full h-4 w-16 border-r-2 border-white'></div>
            </div>
            <div className='bg-green-500 absolute border-l-2 border-white right-0 top-0 rounded-tr-lg  h-[192px] w-[16px]'></div>

            {/* Details */}
            <div className="flex w-full text-gray-600 font-semibold text-sm mt-3">
                <div className="z-10 flex flex-col items-start w-1/2 text-gray-800 font-bold">
                    <p>Umur</p>
                    <p>Universitas</p>
                    <p>Asal Kota</p>
                    <p>Moto Hidup</p>
                </div>
                <div className="z-10 flex flex-col items-start justify-start w-full">
                    <p>: {age} Tahun</p>
                    <p>: {university}</p>
                    <p>: {city}</p>
                    <p>: {motto}</p>
                </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
                {socialLinks.whatsapp && (
                    <a
                        href={socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full hover:bg-green-700 transition-transform transform hover:scale-110"
                    >
                        <FaWhatsapp className="text-white" />
                    </a>
                )}
                {socialLinks.twitter && (
                    <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-500 transition-transform transform hover:scale-110"
                    >
                        <FaTwitter className="text-white" />
                    </a>
                )}
                {socialLinks.facebook && (
                    <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-110"
                    >
                        <FaFacebook className="text-white" />
                    </a>
                )}
                {socialLinks.instagram && (
                    <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-110"
                    >
                        <FaInstagram className="text-white" />
                    </a>
                )}
                {socialLinks.linkedin && (
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full hover:bg-blue-800 transition-transform transform hover:scale-110"
                    >
                        <FaLinkedin className="text-white" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default CardTeam;
