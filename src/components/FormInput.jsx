// src/components/FormInput.jsx
import React from 'react';

export default function FormInput({ type = "text", placeholder, value, onChange }) {
    return (
        <div className="mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[color:#25BB9A]"
            />
        </div>
    );
}
