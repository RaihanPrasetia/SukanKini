// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <div>
                    <Link to="/" className="text-white hover:text-blue-200 mr-4">
                        Home
                    </Link>
                    <Link to="/about" className="text-white hover:text-blue-200">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
