import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import FormInput from '../FormInput';
import AuthContext from '../../pages/Layouts/AuthContext';
import Button from '../Button'; // Ensure this path is correct
import { register } from '../../controllers/authController'; // Fix the import spelling
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function RegisterForm({ onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // State for error messages
    const navigate = useNavigate();
    const { login: contextLogin } = useContext(AuthContext);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Nama lengkap tidak boleh kosong.';
        if (!email) {
            newErrors.email = 'Email tidak boleh kosong.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email tidak valid.';
        }
        if (!password) {
            newErrors.password = 'Password tidak boleh kosong.';
        } else if (password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter.';
        }
        return newErrors;
    };

    const handleRegis = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Prevent form submission if there are errors
        }

        try {
            const data = await register(name, email, password); // Use the helper function
            console.log('Register successful:', data);
            contextLogin(data.token);
            toast.success('Register successful! Redirecting to dashboard...');
            navigate('/home');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.message);
        }
    };

    return (
        <>

            <div className="w-full flex flex-col items-center bg-white p-6 rounded-lg">
                <img
                    src="/assets/images/imgAuth2.png"
                    alt=""
                    className="absolute hidden md:block  -bottom-1 -right-2 object-cover  w-[400px] h-[400px]"
                />
                <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Buat akun Sukankini</h2>

                <form className='w-full space-y-5' onSubmit={handleRegis}>
                    <div className='space-y-4'>
                        <FormInput
                            type="text"
                            placeholder="Nama Lengkap"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors(prev => ({ ...prev, name: undefined })); // Clear error
                            }}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}

                        <FormInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prev => ({ ...prev, email: undefined })); // Clear error
                            }}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}

                        <FormInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prev => ({ ...prev, password: undefined })); // Clear error
                            }}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button title='Daftar' type={'submit'} />
                    </div>
                </form>
                <div className="w-full flex items-center my-4">
                    <div className="flex-1 border-t border-green-500"></div>
                    <p className="text-md text-center text-green-500 px-4">Atau Daftar Dengan</p>
                    <div className="flex-1 border-t border-green-500"></div>
                </div>
                <div className='flex items-center justify-center mb-4'>
                    <Button title='Google' icon={faGoogle} />
                </div>
                <p className='text-sm text-right font-medium text-gray-600'>
                    Anda pengguna lama?{' '}
                    <span className='text-green-500 cursor-pointer' onClick={onLogin}>Masuk</span>
                </p>

                <ToastContainer /> {/* Render the ToastContainer here */}
            </div>
            <div className="flex flex-col justify-between md:w-1/2">
                <h1 className=" items-start justify-start text-center text-[18px] md:text-[24px] text-white font-bold mb-4 hidden md:block">
                    Ayo buat akun segera!
                </h1>
                {/* Image only in desktop view */}
                <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block">
                    {/* You can put an image or other content here if needed */}
                </div>
            </div>
        </>

    );
}

export default RegisterForm;
