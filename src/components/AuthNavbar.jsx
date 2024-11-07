import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-white text-lg font-bold">Dashboard</Link>
                <div>
                    <Link to="/dashboard/home" className="text-white mx-4">Home</Link>
                    <Link to="/dashboard/settings" className="text-white mx-4">Setting</Link>
                    <Link to="/logout" className="text-white">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
