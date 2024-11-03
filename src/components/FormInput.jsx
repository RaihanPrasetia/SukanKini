// src/components/FormInput.jsx
import React from 'react';

export default function FormInput({ type = "text", placeholder, value, onChange }) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
        </div>
    );
}
