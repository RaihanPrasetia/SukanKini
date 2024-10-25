// src/pages/About.jsx
import React from 'react';

function About() {
    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold dark:text-white">About Us</h1>
            <p className="mt-4 text-lg dark:text-white">
                This application is designed to demonstrate a simple React app with routing and theme toggling.
            </p>
            <p className="mt-2 text-lg">
                We hope you find it useful!
            </p>
        </div>
    );
}

export default About;
