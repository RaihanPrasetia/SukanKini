import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaComments } from 'react-icons/fa'; // Import React Icon (chat icon)
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import KelasPelatihan from '../Dashboard/Kelas/KelasPelatihan'; // Ensure this is correctly imported
import Profile from '../Dashboard/Profile/Profile';
import Kelas from '../Dashboard/Profile/Kelas';
import Pembayaran from '../Dashboard/Profile/Pembayaran';
import Notifikasi from '../Dashboard/Profile/Notifikasi';
import DetailKelas from '../Dashboard/Kelas/DetailKelas';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion'; // Import Framer Motion

const Dashboard = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Toggle chat visibility
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="min-h-full bg-gray-100">
            <AuthNavbar />
            <div className="w-full">
                <Routes>
                    {/* Main routes */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/video" element={<VideoCategory />} />
                    <Route path="/kelas" element={<KelasPelatihan />} />

                    {/* Profile routes */}
                    <Route path="/profile" element={<Profile />}>
                        <Route path="kelas" element={<Kelas />} />
                        <Route path="notifikasi" element={<Notifikasi />} />
                        <Route path="pembayaran" element={<Pembayaran />} />
                    </Route>

                    {/* Dynamic class detail route */}
                    <Route path="/kelas/:id" element={<DetailKelas />} />
                </Routes>
            </div>
            <Footer />

            <div
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-tr-full rounded-l-full p-4 shadow-lg cursor-pointer hover:bg-blue-600 transition-all duration-300"
            >
                <FaComments size={24} />
            </div>

            {isChatOpen && (
                <motion.div
                    className="fixed bottom-0 right-0 w-full h-full bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0, x: '100%' }} // Start from the right side (hidden)
                    animate={{ opacity: 1, x: 0 }} // Slide in from the right and fade in
                    exit={{ opacity: 0, x: '100%' }} // Slide out to the right and fade out
                    transition={{ duration: 0.5 }} // Duration of the animation
                >
                    <motion.div
                        className="w-full h-full bg-white p-4 shadow-lg rounded-tl-lg rounded-bl-lg"
                        initial={{ opacity: 0 }} // Initial opacity to 0
                        animate={{ opacity: 1 }} // Fade in when chat window appears
                        exit={{ opacity: 0 }} // Fade out when chat window disappears
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold text-center mb-4">Chat Room</h2>
                        <div className="h-full">
                            {/* Chat content goes here */}
                            <p>Start chatting with someone...</p>
                            {/* You can implement your chat UI here */}
                        </div>

                        {/* Close Button with React Icon and Circle Background */}
                        <button
                            onClick={toggleChat}
                            className="absolute top-4 right-4 text-white bg-red-500 p-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                        >
                            <AiOutlineClose size={14} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;
