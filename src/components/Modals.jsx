import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './authModals/LoginForm';
import RegisterForm from './authModals/RegisterForm';
import ForgotForm from './authModals/ForgotForm';
import OtpForm from './authModals/OtpForm';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function AuthModal({ isOpen, onClose }) {
    const [currentForm, setCurrentForm] = useState("login");

    if (!isOpen) return null;

    const handleForgotPassword = () => setCurrentForm("forgotPassword");
    const handleRegister = () => setCurrentForm("register");
    const handleSendOTP = () => setCurrentForm("otpConfirmation");
    const handleConfirmOTP = () => {
        console.log("OTP confirmed!");
        onClose();
    };

    const renderForm = () => {
        switch (currentForm) {
            case "login":
                return (
                    <LoginForm onForgotPassword={handleForgotPassword} onRegister={handleRegister} />
                );
            case "register":
                return (
                    <RegisterForm onLogin={() => setCurrentForm("login")} onSendOTP={handleSendOTP} />
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
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 w-full modal-overlay"
                    onClick={handleClickOutside}
                >
                    <motion.div
                        className="bg-green-500 rounded-lg shadow-lg relative w-[90%] max-w-[800px] flex flex-col md:flex-row min-h-[400px] justify-start p-5 md:p-5"
                        onClick={(e) => e.stopPropagation()}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Text Section */}

                        {/* Form Section */}

                        {renderForm()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AuthModal;
