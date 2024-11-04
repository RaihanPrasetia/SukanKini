import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import the Google icon

export default function Button({ title, icon, link, onClick, type }) {
    // If `link` is provided, render a `Link` component. Otherwise, render a `button`.
    const ButtonContent = (
        <div className="flex items-center space-x-2">
            {icon && <span className="text-lg"><FontAwesomeIcon icon={icon} /></span>} {/* Render the icon */}
            <span>{title}</span>
        </div>
    );

    return link ? (
        <Link
            to={link}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 font-semibold py-2 rounded-md hover:bg-white hover:shadow-lg hover:border-2 hover:text-green-500 transition duration-300"
            onClick={onClick}
        >
            {ButtonContent}
        </Link>
    ) : (
        <button
            className="flex items-center space-x-2 bg-green-500 text-white px-6 font-semibold py-2 rounded-md hover:bg-slate-100 min-w-[110px] justify-center hover:text-green-500 transition duration-300"
            onClick={onClick}
            type={type}
        >
            {ButtonContent}
        </button>
    );
}
