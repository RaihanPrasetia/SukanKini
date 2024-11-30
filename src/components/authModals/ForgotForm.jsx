import React, { useState } from 'react';
import sendOtpService from '../../service/sendOtpService';
import { checkEmail } from '../../controllers/authController';
import Swal from 'sweetalert2';



function ForgotForm({ onSendOTP, onLogin }) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email tidak boleh kosong.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email tidak valid.';
        }

        return newErrors;
    };

    const handleForgot = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const isEmailRegistered = await checkEmail(email);

            if (!isEmailRegistered) {
                Swal.fire({
                    title: 'Email Tidak Terdaftar',
                    text: 'Email yang Anda masukkan belum terdaftar. Silakan gunakan email lain.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return;
            }
        } catch (error) {
            Swal.fire({
                title: 'Kesalahan',
                text: error.message || 'Terjadi kesalahan saat memeriksa email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const otp = Math.floor(10000 + Math.random() * 90000);
            const response = await sendOtpService.sendOtp(email, otp);

            if (response && response.success) {
                Swal.fire({
                    title: 'OTP Terkirim',
                    text: 'OTP telah dikirim ke email Anda. Silakan masukkan OTP untuk melanjutkan.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    onSendOTP({ otp, email, message: 'OTP telah dikirim ke email Anda. Masukkan OTP untuk melanjutkan.' });
                });
            } else {
                Swal.fire({
                    title: 'Gagal Mengirim OTP',
                    text: 'Silakan coba lagi.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Kesalahan',
                text: error.message || 'Terjadi kesalahan.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };






    return (
        <>
            <div className='w-full flex rounded-xl p-4 md:p-0 md:w-full bg-green-500'>
                <div className="flex flex-col w-[400px] h-[500px] justify-between p-6">
                    <h1 className="items-start justify-start text-center text-[18px] md:text-[16px] text-white font-bold mb-4 hidden md:block">
                        Tenang, kami disini untuk membantu anda!
                    </h1>
                    <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block"></div>
                    <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block"></div>
                </div>
                <img
                    src="/assets/images/authForgot.png"
                    alt=""
                    className="absolute hidden md:block -bottom-1 -left-10 object-cover w-[350px] h-[420px]"
                />
                <div className="w-full flex flex-col items-center justify-center p-[80px] gap-6 bg-white rounded-lg">
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className="text-3xl font-bold text-center text-green-600">Lupa Kata Sandi</h2>
                        <p className='text-center text-[14px] font-semibold text-green-500'>Jangan khawatir, kami akan mengirim pesan ke email Anda</p>
                    </div>

                    <form className='flex flex-col items-center gap-2 justify-center w-full' onSubmit={handleForgot}>
                        <input
                            type="email"
                            placeholder="Masukan email Anda"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200 shadow-sm"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <div>
                            <button
                                type='submit'
                                className="bg-green-500 px-3 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            >
                                Kirim OTP
                            </button>
                        </div>
                    </form>

                    <button
                        className="text-green-500 w-full text-center font-semibold hover:underline"
                        onClick={onLogin}
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>

        </>
    );
}

export default ForgotForm;
