// src/components/authModals/AuthForms/ForgotPasswordForm.jsx
import React from 'react';
import FormInput from '../FormInput';

function ForgotForm({ onSendOTP, onLogin }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            <FormInput type="email" placeholder="Enter email"
            />
            <button onClick={onSendOTP} className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600">Send OTP</button>
            <button className="text-blue-500 w-full mt-2" onClick={onLogin}>Back to Login</button>
        </div>
    );
}

export default ForgotForm;
