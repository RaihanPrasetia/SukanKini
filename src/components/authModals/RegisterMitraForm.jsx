import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../assets/FormInput';
import Button from '../assets/Button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { checkEmailAvailability } from '../../controllers/authController';


function RegisterMitraForm({ onLoginMitra, onSendOTP }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [kota, setKota] = useState('');
    const [alamat, setAlamat] = useState('');
    const [bank, setBank] = useState('');
    const [no_rek, setNorek] = useState('');
    const [an, setAn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Nama lengkap tidak boleh kosong.';
        if (!email.trim()) {
            newErrors.email = 'Email tidak boleh kosong.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email tidak valid.';
        }
        if (!password.trim()) {
            newErrors.password = 'Password tidak boleh kosong.';
        } else if (password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter.';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password tidak cocok.';
        }
        return newErrors;
    };

    const handleRegis = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        // Check for form validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Check if the email is already registered
        try {
            const isEmailRegistered = await checkEmailAvailability(email);
            if (!isEmailRegistered) { // Change this line to check for availability
                toast.error('Email sudah terdaftar. Silakan gunakan email lain.');
                return; // Stop the registration process if email is already registered
            }
        } catch (error) {
            console.error("Error checking email:", error);
            toast.error('Terjadi kesalahan saat memeriksa email. Silakan coba lagi.');
            return; // Stop if there was an error checking the email
        }

        // Generate OTP and call onSendOTP
        const otp = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit OTP
        console.log('Generated OTP:', otp);

        // Send user data and OTP
        onSendOTP({ otp, name, email, password }); // Call the function to proceed to the OTP step
    };


    return (
        <>
            <div className="w-full flex rounded-xl p-4 md:p-0 md:w-full bg-yellow-500">


                <div className="w-full flex flex-col items-center bg-white p-6 rounded-lg relative">
                    <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Buat Akun Mitra Sukankini</h2>

                    <form className="w-full space-y-5" onSubmit={handleRegis}>
                        <div className="space-y-4">
                            <FormInput
                                className="border-yellow-300 focus:ring-yellow-400"
                                type="text"
                                placeholder="Nama Pelatihan Anda"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setErrors((prev) => ({ ...prev, name: undefined }));
                                }}
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}

                            <FormInput
                                className="border-yellow-300 focus:ring-yellow-400"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: undefined }));
                                }}
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}

                            <FormInput
                                className="border-yellow-300 focus:ring-yellow-400"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((prev) => ({ ...prev, password: undefined }));
                                }}
                            />
                            {errors.password && <p className="text-red-500">{errors.password}</p>}

                            <FormInput
                                className="border-yellow-300 focus:ring-yellow-400"
                                type="password"
                                placeholder="Konfirmasi Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                                }}
                            />
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                        </div>

                        <div className="flex items-center justify-center">
                            <Button title="Daftar Mitra" type="submit" className="text-nowrap bg-yellow-500 hover:text-yellow-500" />
                        </div>
                    </form>

                    <div className="w-full flex items-center my-4">
                        <div className="flex-1 border-t border-yellow-500"></div>
                        <p className="text-md text-center text-yellow-500 px-4">Atau Daftar Dengan</p>
                        <div className="flex-1 border-t border-yellow-500"></div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <Button title="Google" icon={faGoogle} className="text-nowrap bg-yellow-500 hover:text-yellow-500" />
                    </div>

                    <p className="text-sm text-right font-medium text-gray-600">
                        Anda pengguna lama?{' '}
                        <span className="text-yellow-500 cursor-pointer" onClick={onLoginMitra}>
                            Masuk
                        </span>
                    </p>

                    <ToastContainer />
                </div>

                <div className="flex flex-col justify-between md:w-1/2 py-5">
                    <h1 className="text-center text-[16px] md:text-[22px] text-white font-bold mb-4 hidden md:block">
                        Jadi bagian dari mitra kami! Rasakan Keuntungannya
                    </h1>
                    <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block">
                    </div>
                </div>
                <img
                    src="/assets/images/imgAuth2.png"
                    alt=""
                    className="absolute hidden md:block -bottom-1 -right-2 object-cover w-[400px] h-[400px]"
                />
            </div>
        </>
    );
}

export default RegisterMitraForm;
