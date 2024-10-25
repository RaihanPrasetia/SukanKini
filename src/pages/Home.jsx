// src/pages/Home.jsx
import React from 'react';

function Home() {
    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold dark:text-white">Welcome to the Home Page</h1>
            <p className="mt-4 text-lg dark:text-white">
                This is the main page of the application. You can navigate to the About page using the navbar.
            </p>
        </div>
    );
}

export default Home;
