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

    // Function to close modal when clicking outside the modal content
    const handleClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 w-full modal-overlay"
            onClick={handleClickOutside}
        >
            <div className="bg-green-500 rounded-lg shadow-lg relative w-[1000px] flex min-h-[400px] justify-start" onClick={(e) => e.stopPropagation()}>
                <div className="min-w-[350px] h-full text-start py-10">
                    <h1 className="text-center text-[16px] text-white font-bold px-5">
                        Selamat datang di perjalanan kebugaranmu! Masuk untuk mulai kembali.
                    </h1>
                </div>
                <div className="flex items-center justify-center w-full bg-white rounded-xl p-24">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
