// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../assets/FormInput';
import Button from '../assets/Button';
import { useAuth } from '../../contexts/AuthContext';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { login } from '../../controllers/authController';

function LoginMitraForm({ onForgotPassword, onRegisterMitra, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth();

    // Validate email and password input
    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = 'Masukkan Email';
            newErrors.email = 'Masukkan Email';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Format email tidak valid.';
        }

        if (!password) {
            newErrors.password = 'Masukkan Password';
        } else if (password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter.';
        }

        return newErrors;
    };

    // Handle login functionality
    const handleLogin = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const { token, user } = await login(email, password);
            localStorage.setItem('token', token);
            localStorage.setItem('name', user.name);
            localStorage.setItem('role', user.role);
            contextLogin(token, user.name, user.role); // Mengupdate context

            toast.success(`Welcome, ${user.name}`);
            navigate('/mitra/home'); // Navigasi ke halaman yang tepat setelah login
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(error.message || 'Login failed. Please try again.');
        }
    };




    return (
        <>
            <div className="w-full flex rounded-xl p-2 md:p-0 md:w-full bg-yellow-500">

                <div className="w-full flex flex-col items-center p-6 bg-white rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-yellow-500 text-center">
                        MASUK KE AKUN SUKANKINI
                    </h1>
                    <form className="w-full space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-1">
                                <FormInput
                                    className="border-yellow-300 focus:ring-yellow-400"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors((prev) => ({ ...prev, email: undefined })); // Clear email error on change
                                    }}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="flex flex-col space-y-1">
                                <FormInput
                                    className="border-yellow-300 focus:ring-yellow-400"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors((prev) => ({ ...prev, password: undefined })); // Clear password error on change
                                    }}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                        </div>
                        <p className="text-sm text-right font-medium text-gray-600">
                            Password akun Anda lupa?{' '}
                            <span className="text-yellow-500 cursor-pointer" onClick={onForgotPassword}>
                                Dapatkan
                            </span>
                        </p>
                        <div className="flex items-center space-x-5 w-full justify-center">
                            <Button title="Masuk Mitra" type="submit" className="text-nowrap bg-yellow-500 hover:text-yellow-500" />
                            <Button title="Google" icon={faGoogle} className="text-nowrap bg-yellow-500 hover:text-yellow-500" />
                        </div>
                    </form>
                    <p className="text-sm text-center font-medium text-gray-600 my-5">
                        Buat Akun Mitra Anda?{' '}
                        <span className="text-yellow-500 cursor-pointer" onClick={onRegisterMitra}>
                            Daftar
                        </span>
                    </p>

                    <div className="w-full flex items-center my-4">
                        <div className="flex-1 border-t border-yellow-500"></div>
                        <p className="text-md text-center text-yellow-500 px-4">Atau Masuk Sebagai Pengguna</p>
                        <div className="flex-1 border-t border-yellow-500"></div>
                    </div>


                    <div className='flex w-full justify-center space-x-4 items-center '>
                        <Button title="Masuk" onClick={onLogin} className="bg-yellow-500 hover:text-yellow-500" />
                    </div>

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
                <div className="flex flex-col justify-between ">
                    <h1 className="items-start justify-start text-center p-2 text-[18px] md:text-[16px] text-white font-bold mb-4 hidden md:block py-5">
                        Selamat datang Mitra Kami! Masuk untuk mulai kembali.
                    </h1>
                    <div className="md:h-auto overflow-hidden bg-yellow-500 hidden md:block"></div>
                    <div className="md:h-auto overflow-hidden bg-yellow-500 hidden md:block"></div>
                </div>
                <img
                    src="/assets/images/daftar mitra.png"
                    alt=""
                    className="absolute hidden md:block top-5 right-0 object-cover w-[280px] h-[300px]"
                />
            </div>
        </>
    );
}

export default LoginMitraForm;
