// src/components/authModals/AuthForms/OTPConfirmationForm.jsx
import React from 'react';

function OtpForm({ onConfirmOTP, onLogin }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">OTP Confirmation</h2>
            <input type="text" placeholder="Enter OTP" className="w-full mb-4 p-2 border rounded" />
            <button onClick={onConfirmOTP} className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600">Confirm OTP</button>
            <button className="text-blue-500 w-full mt-2" onClick={onLogin}>Back to Login</button>
        </div>
    );
}

export default OtpForm;
