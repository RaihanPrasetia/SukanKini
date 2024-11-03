// src/components/authModals/AuthModal.jsx
import React, { useState } from 'react';
import LoginForm from './authModals/LoginForm';
import RegisterForm from './authModals/RegisterForm';
import ForgotForm from './authModals/ForgotForm';
import OtpForm from './authModals/OtpForm';

function AuthModal({ isOpen, onClose }) {
    const [currentForm, setCurrentForm] = useState("login");

    if (!isOpen) return null;

    const handleForgotPassword = () => setCurrentForm("forgotPassword");
    const handleRegister = () => setCurrentForm("register");
    const handleSendOTP = () => setCurrentForm("otpConfirmation");
    const handleConfirmOTP = () => {
        // Logic to confirm OTP
        console.log("OTP confirmed!");
        onClose(); // Optionally close the modal after confirmation
    };

    const renderForm = () => {
        switch (currentForm) {
            case "login":
                return (
                    <LoginForm onForgotPassword={handleForgotPassword} onRegister={handleRegister} />
                );
            case "register":
                return (
                    <RegisterForm onLogin={() => setCurrentForm("login")} />
                );
            case "forgotPassword":
                return (
                    <ForgotForm onSendOTP={handleSendOTP} onLogin={() => setCurrentForm("login")} />
                );
            case "otpConfirmation":
                return (
                    <OtpForm onConfirmOTP={handleConfirmOTP} onLogin={() => setCurrentForm("login")} />
                );
            default:
                return null;
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">X</button>
                {renderForm()}
            </div>
        </div>
    );
}

export default AuthModal;
