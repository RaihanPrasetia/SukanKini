// src/components/ThemeToggleButton.jsx
import React, { useEffect, useState } from 'react';

function ThemeToggleButton() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark'); // Add dark class to html element
            document.body.classList.add('dark'); // Add dark class to body
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark'); // Remove dark class from html element
            document.body.classList.remove('dark'); // Remove dark class from body
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark'); // Add dark class to html element
            document.body.classList.add('dark'); // Add dark class to body
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark'); // Remove dark class from html element
            document.body.classList.remove('dark'); // Remove dark class from body
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 mt-4 dark:bg-gray-200 bg-gray-700 dark:text-gray-900 text-gray-200 rounded"
        >
            Toggle Theme
        </button>
    );
}

export default ThemeToggleButton;
