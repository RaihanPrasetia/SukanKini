import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import Footer from '../../components/Footer';
import Home from '../Dashboard/Home';
import Community from '../Dashboard/Community';
import VideoCategory from '../Dashboard/VideoCategory';
import KelasPelatihan from '../Dashboard/Kelas/KelasPelatihan';
import Profile from '../Dashboard/Profile/Profile';
import Kelas from '../Dashboard/Profile/Kelas';
import Pembayaran from '../Dashboard/Profile/Pembayaran';
import Notifikasi from '../Dashboard/Profile/Notifikasi';
import DetailKelas from '../Dashboard/Kelas/DetailKelas';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import NotFound from '../../components/NotFound';

const Dashboard = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const location = useLocation();

    // Tentukan apakah komponen NotFound sedang dirender
    const isNotFoundPage = location.pathname !== '/home' &&
        location.pathname !== '/community' &&
        location.pathname !== '/video' &&
        location.pathname !== '/kelas' &&
        location.pathname !== '/profile' &&
        !location.pathname.startsWith('/kelas/') &&
        !location.pathname.startsWith('/profile/');

    // Toggle chat visibility
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Handle message input change
    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    // Handle message submission
    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now(), text: inputMessage, sender: 'user' },
        ]);
        setInputMessage('');
    };

    return (
        <div className="min-h-full bg-gray-100">
            {/* Tampilkan navbar jika bukan halaman NotFound */}
            {!isNotFoundPage && <AuthNavbar />}
            <div className="w-full">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/video" element={<VideoCategory />} />
                    <Route path="/kelas" element={<KelasPelatihan />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="kelas" element={<Kelas />} />
                        <Route path="notifikasi" element={<Notifikasi />} />
                        <Route path="pembayaran" element={<Pembayaran />} />
                    </Route>
                    <Route path="/kelas/:id" element={<DetailKelas />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {/* Tampilkan footer jika bukan halaman NotFound */}
            {!isNotFoundPage && <Footer />}

            {/* Chat Button */}
            <div
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-tr-full rounded-l-full p-4 shadow-lg cursor-pointer hover:bg-blue-600 transition-all duration-300"
            >
                <FaComments size={24} />
            </div>

            {/* Chat Window */}
            {isChatOpen && (
                <motion.div
                    className="fixed bottom-0 right-0 w-full h-full bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-full max-w-lg h-3/4 bg-white fixed bottom-0 right-0 shadow-lg rounded-tl-lg rounded-bl-lg p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chat Room</h2>
                            <button
                                onClick={toggleChat}
                                className="text-white bg-red-500 p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                            >
                                <AiOutlineClose size={16} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex flex-col space-y-2 overflow-y-auto h-3/4 p-2 border-t border-b border-gray-200">
                            {messages.length > 0 ? (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`p-3 rounded-lg text-sm shadow-md ${message.sender === 'user'
                                            ? 'bg-blue-100 text-blue-800 self-end'
                                            : 'bg-gray-100 text-gray-800 self-start'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center">Mulai percakapan...</p>
                            )}
                        </div>

                        {/* Chat Input */}
                        <div className="flex items-center mt-4">
                            <input
                                type="text"
                                className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Ketik pesan..."
                                value={inputMessage}
                                onChange={handleInputChange}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-2 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                            >
                                Kirim
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;
