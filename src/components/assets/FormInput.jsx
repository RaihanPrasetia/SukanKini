// src/components/FormInput.jsx
import React from 'react';

export default function FormInput({
    type = "text",
    placeholder,
    value,
    onChange,
    className,
    label,
    ...rest
}) {
    return (
        <div>
            {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${className || ''}`}
                {...rest} // Spread any additional props
            />
        </div>
    );
}
