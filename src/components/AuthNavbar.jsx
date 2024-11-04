import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/Layouts/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/'); // Redirect the user to the landing page or login page
    };
    return (
        <nav className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="home" className="text-white text-lg font-bold">Dashboard</Link>
                <div>
                    <Link to="home" className="text-white mx-4">Home</Link>
                    <Link to="settings" className="text-white mx-4">Setting</Link>
                    <button onClick={handleLogout} className="text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
