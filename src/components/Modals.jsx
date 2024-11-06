import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './authModals/LoginForm';
import RegisterForm from './authModals/RegisterForm';
import ForgotForm from './authModals/ForgotForm';
import OtpForm from './authModals/OtpForm';
import { register } from '../controllers/authController';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../pages/Layouts/AuthContext'; // Ensure to use your custom hook
import LoginMitraForm from './authModals/LoginMitraForm';
import RegisterMitraForm from './authModals/RegisterMitraForm';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function AuthModal({ isOpen, onClose }) {
    const [currentForm, setCurrentForm] = useState("login");
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Use your AuthContext's login function

    if (!isOpen) return null;

    const handleForgotPassword = () => setCurrentForm("forgotPassword");
    const handleRegister = () => setCurrentForm("register");
    const handleRegisterMitra = () => setCurrentForm("registerMitra");
    const handleLoginMitra = () => setCurrentForm("loginMitra");

    const handleSendOTP = ({ otp: generatedOtp, name, email, password }) => {
        setOtp(generatedOtp);
        setUserData({ name, email, password });
        setCurrentForm("otpConfirmation");
    };

    const handleConfirmOTP = async (inputOtp) => {
        console.log("Entered OTP:", inputOtp);
        console.log("Stored OTP:", otp);

        if (inputOtp === otp.toString()) {
            try {
                const { token, user } = await register(userData); // Assuming this returns a promise
                login(token, user.name, user.role); // Call the login method
                navigate('/home'); // Navigate to home
            } catch (error) {
                console.error("Registration error:", error);
                toast.error('Registration failed. Please try again.');
            }
        } else {
            console.log("OTP is incorrect!");
            toast.error('OTP tidak valid. Silakan coba lagi.');
        }
    };

    const renderForm = () => {
        switch (currentForm) {
            case "login":
                return (
                    <LoginForm
                        onForgotPassword={handleForgotPassword}
                        onRegister={handleRegister}
                        onLoginMitra={handleLoginMitra}
                    />
                );
            case "loginMitra":
                return (
                    <LoginMitraForm
                        onForgotPassword={handleForgotPassword}
                        onRegisterMitra={handleRegisterMitra}
                        onLogin={() => setCurrentForm("login")}
                    />
                );
            case "register":
                return (
                    <RegisterForm
                        onLogin={() => setCurrentForm("login")}
                        onSendOTP={handleSendOTP}
                        onRegisterMitra={handleRegisterMitra}
                    />
                );
            case "registerMitra":
                return (
                    <RegisterMitraForm
                        onLoginMitra={handleLoginMitra}
                        onSendOTP={handleSendOTP}
                    />
                );
            case "forgotPassword":
                return (
                    <ForgotForm
                        onSendOTP={handleSendOTP}
                        onLogin={() => setCurrentForm("login")}
                    />
                );
            case "otpConfirmation":
                return (
                    <OtpForm
                        onConfirmOTP={handleConfirmOTP}
                        onLogin={() => setCurrentForm("login")}
                    />
                );
            default:
                return null;
        }
    };

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
                        className="rounded-lg shadow-lg relative w-[90%] max-w-[800px] flex flex-col md:flex-row min-h-[400px] justify-start "
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {renderForm()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AuthModal;
