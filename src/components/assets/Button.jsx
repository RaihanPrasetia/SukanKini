import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({ title, icon, link, onClick, type, className }) {
    // If `link` is provided, render a `Link` component. Otherwise, render a `button`.
    const ButtonContent = (
        <div className="flex items-center space-x-2">
            {icon && <span className="text-lg"><FontAwesomeIcon icon={icon} /></span>} {/* Render the icon */}
            <span>{title}</span>
        </div>
    );

    // Base styles for the button
    const baseStyles =
        "flex items-center space-x-2 bg-green-500 text-white px-6 font-semibold py-2 rounded-md transition duration-300";
    const hoverStyles =
        "hover:bg-white hover:shadow-lg  hover:text-green-500";
    const buttonStyles = `${baseStyles} ${hoverStyles} ${className || ''}`;

    return link ? (
        <Link
            to={link}
            className={buttonStyles}
            onClick={onClick}
        >
            {ButtonContent}
        </Link>
    ) : (
        <button
            className={buttonStyles}
            onClick={onClick}
            type={type}
        >
            {ButtonContent}
        </button>
    );
}
