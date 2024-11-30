import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './authModals/LoginForm';
import RegisterForm from './authModals/RegisterForm';
import ForgotForm from './authModals/ForgotForm';
import OtpForm from './authModals/OtpForm';
import { register, registerMitra } from '../controllers/authController';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext'; // Ensure to use your custom hook
import LoginMitraForm from './authModals/LoginMitraForm';
import RegisterMitraForm from './authModals/RegisterMitraForm';
import NewPasswordForm from './authModals/NewPasswordForm';
import OtpFormMitra from './authModals/OtpFormMitra';
import OtpFormReset from './authModals/OtpFormReset';
import sendOtpService from '../service/sendOtpService';
import Swal from 'sweetalert2';



const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function AuthModal({ isOpen, onClose }) {
    const [currentForm, setCurrentForm] = useState("login");
    const [userData, setUserData] = useState({ name: '', email: '', password: '', kota: '', alamat: '', bank: '', an: '', no_rek: '' });
    const [otp, setOtp] = useState(null);
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();
    const { login } = useAuth(); // Use your AuthContext's login function
    if (!isOpen) return null;

    const handleForgotPassword = () => setCurrentForm("forgotPassword");
    const handleRegister = () => setCurrentForm("register");
    const handleRegisterMitra = () => setCurrentForm("registerMitra");
    const handleLoginMitra = () => setCurrentForm("loginMitra");
    const handleResendOtp = async () => {
        const otp = Math.floor(10000 + Math.random() * 90000);
        const email = userData.email
        try {
            const response = await sendOtpService.sendOtp(email, otp);

            if (response && response.success) {
                toast.success('OTP telah dikirim ke email Anda.');
                const reMessage = response.message
                setOtp(otp);
                setMessage(reMessage)
                Swal.fire({
                    title: 'Cek Email Anda',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                toast.error('Gagal mengirim OTP. Coba lagi.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.');
        }
    };

    const handleSendOTP = ({ otp: generatedOtp, name, email, password, kota, alamat, brand, no_rek, an, message }) => {
        setOtp(generatedOtp);  // Store generated OTP for validation later
        setMessage(message);  // Store generated OTP for validation later
        setUserData({ name, email, password, kota, alamat, brand, no_rek, an });  // Store user data for registration
        setCurrentForm("otpConfirmation");  // Switch to OTP confirmation form
    }
    const handleSendOTPMitra = ({ otp: generatedOtp, name, email, password, kota, alamat, brand, no_rek, an, message }) => {
        setOtp(generatedOtp);
        setMessage(message);  // Store generated OTP for validation later
        setUserData({ name, email, password, kota, alamat, brand, no_rek, an });  // Store user data for registration
        setCurrentForm("otpConfirmationMitra");  // Switch to OTP confirmation form
    }

    const handleSendOtpForgot = ({ otp: forgotOtp, email, message }) => {
        setOtp(forgotOtp); // Simpan OTP di state
        setUserData({ email });
        setMessage(message)
        setCurrentForm("otpForgotConfirmation"); // Pindah ke form verifikasi OTP
    };

    const handleToResetPassword = (inputOtp) => {
        if (inputOtp === otp.toString()) {
            Swal.fire({
                title: "Berhasil!",
                text: "OTP cocok. Silahkan atur ulang kata sandi.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                setCurrentForm('newResetPassword');
            });
        } else {
            Swal.fire({
                title: "OTP Tidak Valid",
                text: "OTP yang Anda masukkan tidak cocok. Silakan coba lagi.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };



    const handleConfirmOTP = async (inputOtp) => {
        if (inputOtp === otp.toString()) {
            try {
                const { token, user } = await register(userData); // Assuming this returns a promise
                login(token, user.name, user.role);
                Swal.fire({
                    title: 'Selamat Datang!',
                    text: 'Pendaftaran Anda berhasil! Selamat bergabung bersama kami. Semoga pengalaman Anda menyenangkan.',
                    icon: 'success',
                    confirmButtonText: 'Lanjutkan',
                    confirmButtonColor: '#4CAF50',
                    background: '#f7f7f7',
                    color: '#333',
                    iconColor: '#28a745',
                    padding: '20px',
                    customClass: {
                        popup: 'swal-popup-custom',
                        title: 'swal-title-custom',
                        icon: 'swal-icon-custom',
                        confirmButton: 'swal-btn-custom'
                    },
                });
                navigate('/home');
            } catch (error) {
                console.error("Registration error:", error);
                toast.error('Registration failed. Please try again.');
            }
        } else {
            Swal.fire({
                title: 'OTP Salah!',
                text: 'OTP yang Anda masukkan tidak valid. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleConfirmOTPMitra = async (inputOtp) => {
        if (inputOtp === otp.toString()) {
            try {
                const { token, user } = await registerMitra(userData); // Call the updated registerMitra function
                login(token, user.name, user.role); // Log in the user with the received token and user data

                if (user.role === 'mitra') {
                    Swal.fire({
                        title: 'Selamat Datang!',
                        text: 'Pendaftaran Anda berhasil! Tinggal satu langkah lagi dan jadi bagian dari Mitra Kami.',
                        icon: 'success',
                        confirmButtonText: 'Lanjutkan',
                        confirmButtonColor: '#4CAF50',
                        background: '#f7f7f7',
                        color: '#333',
                        iconColor: '#28a745',
                        padding: '20px',
                        customClass: {
                            popup: 'swal-popup-custom',
                            title: 'swal-title-custom',
                            icon: 'swal-icon-custom',
                            confirmButton: 'swal-btn-custom'
                        },
                    });
                    navigate('/mitra/home'); // Redirect to mitra's home page if the user is a mitra
                } else {
                    navigate('/'); // Regular users go to the home page
                }
            } catch (error) {
                console.error("Registration error:", error);
                toast.error('Registration failed. Please try again.');
            }
        } else {
            Swal.fire({
                title: 'OTP Salah!',
                text: 'OTP yang Anda masukkan tidak valid. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
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
                    />
                );
            case "registerMitra":
                return (
                    <RegisterMitraForm
                        onLoginMitra={handleLoginMitra}
                        onSendOTPMitra={handleSendOTPMitra}
                    />
                );
            case "forgotPassword":
                return (
                    <ForgotForm
                        onSendOTP={handleSendOtpForgot}
                        onLogin={() => setCurrentForm("login")}
                    />
                );
            case "otpConfirmation":
                return (
                    <OtpForm
                        reSendOtp={handleResendOtp}
                        onMessage={message}
                        onConfirmOTP={handleConfirmOTP}
                        onLogin={handleRegister}
                    />
                );
            case "otpConfirmationMitra":
                return (
                    <OtpFormMitra
                        reSendOtp={handleResendOtp}
                        onMessage={message}
                        onConfirmOTPMitra={handleConfirmOTPMitra}
                        onRegisterMitra={handleRegisterMitra}
                    />
                );
            case "otpForgotConfirmation":
                return (
                    <OtpFormReset
                        reSendOtp={handleResendOtp}
                        onConfirmOTPMitra={handleToResetPassword}
                        onBack={handleForgotPassword}
                    />
                );
            case "newResetPassword":
                return (
                    <NewPasswordForm
                        reEmail={userData.email}

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