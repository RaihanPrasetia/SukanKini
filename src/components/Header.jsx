// src/components/Header.jsx
import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component

function Header() {
    return (
        <header>
            <Navbar /> {/* Include Navbar here */}
            <h1 className="text-center text-2xl text-white">My App Header</h1>
        </header>
    );
}

export default Header;
