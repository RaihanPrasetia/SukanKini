import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../assets/FormInput';
import Button from '../assets/Button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { checkEmailAvailability } from '../../controllers/authController';
import sendOtpService from '../../service/sendOtpService';


function RegisterMitraForm({ onLoginMitra, onSendOTPMitra }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [kota, setKota] = useState('');
    const [alamat, setAlamat] = useState('');
    const [brand, setBrand] = useState('');
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
        if (!kota.trim()) newErrors.kota = 'Kota tidak boleh kosong.';
        if (!alamat.trim()) newErrors.alamat = 'Alamat tidak boleh kosong.';
        if (!brand.trim()) newErrors.brand = 'Isi Nama brand.';
        if (!no_rek.trim()) newErrors.no_rek = 'Isi Nomor rekening.';
        if (!an.trim()) newErrors.an = 'Atas nama';
        return newErrors;
    };

    const handleRegisMitra = async (e) => {
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

        // Generate OTP
        const otp = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit OTP

        // Send OTP to the user's email through backend using axios
        try {
            const response = await sendOtpService.sendOtp(email, otp);

            if (response && response.message) {
                toast.success('OTP telah dikirim ke email Anda.');
                // Proceed with sending data to the next step
                onSendOTPMitra({ otp, name, email, password, kota, alamat, brand, no_rek, an });
            } else {
                toast.error('Gagal mengirim OTP. Coba lagi.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.');
        }
    };


    return (
        <>
            <img
                src="/assets/images/daftar mitra.png"
                alt=""
                className="absolute hidden md:block top-[20%] right-0 object-cover w-[270px] h-[270px]"
            />
            <div className="w-full flex rounded-xl p-4 md:p-0 md:w-full bg-yellow-500">
                <div className="w-full flex flex-col items-center bg-white p-6 rounded-lg relative">
                    <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Buat Akun Mitra Sukankini</h2>

                    <form className="w-full space-y-5" onSubmit={handleRegisMitra}>
                        <div className="space-y-2">
                            <div>
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
                            </div>
                            <div>
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
                            </div>



                            <div className="flex gap-4">
                                <div className="w-full">
                                    <FormInput
                                        className="border-yellow-300 focus:ring-yellow-400"
                                        type="text"
                                        placeholder="Kota"
                                        value={kota}
                                        onChange={(e) => {
                                            setKota(e.target.value);
                                            setErrors((prev) => ({ ...prev, kota: undefined }));
                                        }}
                                    />
                                    {errors.kota && <p className="text-red-500">{errors.kota}</p>}
                                </div>
                                <div className="w-full">
                                    <FormInput
                                        className="border-yellow-300 focus:ring-yellow-400"
                                        type="text"
                                        placeholder="Alamat"
                                        value={alamat}
                                        onChange={(e) => {
                                            setAlamat(e.target.value);
                                            setErrors((prev) => ({ ...prev, alamat: undefined }));
                                        }}
                                    />
                                    {errors.alamat && <p className="text-red-500">{errors.alamat}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-full">
                                    <FormInput
                                        className="border-yellow-300 focus:ring-yellow-400"
                                        type="text"
                                        placeholder="Nama Bank"
                                        value={brand}
                                        onChange={(e) => {
                                            setBrand(e.target.value);
                                            setErrors((prev) => ({ ...prev, brand: undefined }));
                                        }}
                                    />
                                    {errors.brand && <p className="text-red-500">{errors.brand}</p>}
                                </div>
                                <div className="w-full">
                                    <FormInput
                                        className="border-yellow-300 focus:ring-yellow-400"
                                        type="text"
                                        placeholder="Nomor Rekening"
                                        value={no_rek}
                                        onChange={(e) => {
                                            setNorek(e.target.value);
                                            setErrors((prev) => ({ ...prev, no_rek: undefined }));
                                        }}
                                    />
                                    {errors.no_rek && <p className="text-red-500">{errors.no_rek}</p>}
                                </div>
                                <div className="w-full">
                                    <FormInput
                                        className="border-yellow-300 focus:ring-yellow-400"
                                        type="text"
                                        placeholder="Atas Nama"
                                        value={an}
                                        onChange={(e) => {
                                            setAn(e.target.value);
                                            setErrors((prev) => ({ ...prev, an: undefined }));
                                        }}
                                    />
                                    {errors.an && <p className="text-red-500">{errors.an}</p>}
                                </div>
                            </div>
                            <div>
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
                            </div>

                            <div>
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

                    <p className="text-center text-sm text-yellow-500">
                        Sudah memiliki akun?{' '}
                        <button className="font-bold" onClick={onLoginMitra}>
                            Masuk
                        </button>
                    </p>
                </div>
                <div className="flex flex-col justify-between md:w-1/2 py-5">
                    <h1 className="text-center text-[16px] md:text-[22px] text-white font-bold mb-4 hidden md:block">
                        Jadi bagian dari mitra kami! rasakan keuntungannya.
                    </h1>
                    <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block">
                    </div>
                </div>


            </div>

            <ToastContainer />
        </>
    );
}

export default RegisterMitraForm;