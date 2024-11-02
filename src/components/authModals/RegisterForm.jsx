// src/components/authModals/AuthForms/RegisterForm.jsx
import React from 'react';

function RegisterForm({ onLogin }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
            <button className="bg-green-500 text-white w-full py-2 rounded mb-2 hover:bg-green-600">Register</button>
            <button className="text-blue-500 w-full mt-2" onClick={onLogin}>Already have an account? Login</button>
        </div>
    );
}

export default RegisterForm;
