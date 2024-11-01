// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModals';

function Navbar() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <div>
                    <Link to="/" className="text-white hover:text-blue-200 mr-4">Home</Link>
                    <Link to="/about" className="text-white hover:text-blue-200">About</Link>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
                >
                    Login
                </button>

                <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </nav>
    );
}

export default Navbar;
