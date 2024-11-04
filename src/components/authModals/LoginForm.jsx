import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../FormInput';
import Button from '../Button';
import AuthContext from '../../pages/Layouts/AuthContext';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { login as loginApi } from '../../controllers/authController';

function LoginForm({ onForgotPassword, onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login: contextLogin } = useContext(AuthContext);

    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

        if (!email) {
            newErrors.email = 'Masukkan Email ';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Invalid email format.';
        }

        if (!password) {
            newErrors.password = 'Masukkan Password';
        } else if (password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter.';
        }

        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = await loginApi(email, password);
            contextLogin(data.token);
            toast.success('Selamat Bergabung');
            navigate('/home');
        } catch (error) {
            console.error('Gagal Masuk:', error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className='w-full flex  rounded-xl p-2 md:p-0 md:w-full'>
                <div className="flex flex-col justify-between md:w-1/2">
                    <h1 className=" items-start justify-start text-center text-[18px] md:text-[16px] text-white font-bold mb-4 hidden md:block">
                        Selamat datang di perjalanan kebugaranmu! Masuk untuk mulai kembali.
                    </h1>
                    {/* Image only in desktop view */}
                    <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block">
                        {/* You can put an image or other content here if needed */}
                    </div>
                </div>
                <img
                    src="/assets/images/imgAuth1.png"
                    alt=""
                    className="absolute hidden md:block  -bottom-2 -left-10 object-cover  w-[400px] h-[400px]"
                />
                <div className='w-full flex flex-col items-center p-6 bg-white rounded-lg '>
                    <h1 className="text-2xl font-bold mb-6 text-green-500 text-center">
                        MASUK KE AKUN SUKANKINI
                    </h1>
                    <form className='w-full space-y-5' onSubmit={handleLogin}>
                        <div className='space-y-4'>
                            <div className='flex flex-col space-y-1'>
                                <FormInput
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors(prev => ({ ...prev, email: undefined })); // Clear email error on change
                                    }}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className='flex flex-col space-y-1'>
                                <FormInput
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, password: undefined })); // Clear password error on change
                                    }}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                        </div>
                        <p className='text-sm text-right font-medium text-gray-600'>
                            Password akun Anda lupa?{' '}
                            <span className='text-green-500 cursor-pointer' onClick={onForgotPassword}>Dapatkan</span>
                        </p>
                        <div className='flex items-center justify-center'>
                            <Button title='Login' type={'submit'} />
                        </div>
                    </form>
                    <div className="w-full flex items-center my-4">
                        <div className="flex-1 border-t border-green-500"></div>
                        <p className="text-md text-center text-green-500 px-4">Atau Masuk Dengan</p>
                        <div className="flex-1 border-t border-green-500"></div>
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <Button title='Google' icon={faGoogle} />
                    </div>

                    <p className='text-sm text-center font-medium text-gray-600'>
                        Anda pengguna baru?{' '}
                        <span className='text-green-500 cursor-pointer' onClick={onRegister}>Daftar</span>
                    </p>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </div>
            </div>
        </>
    );
}

export default LoginForm;
