import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast
import FormInput from '../assets/FormInput';
import AuthContext from '../../pages/Layouts/AuthContext';
import Button from '../assets/Button'; // Ensure this path is correct
import { register } from '../../controllers/authController'; // Fix the import spelling
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function RegisterForm({ onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login: contextLogin } = useContext(AuthContext);

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
        return newErrors;
    };

    const handleRegis = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = await register(name, email, password);
            console.log('Register successful:', data);
            contextLogin(data.token, data.user.name, data.user.role);
            toast.success('Registrasi berhasil! Mengarahkan ke dashboard...');
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error?.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
        }
    };

    return (
        <>

            <div className="w-full flex flex-col items-center bg-white p-6 rounded-lg relative">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Buat Akun Sukankini</h2>

                <form className="w-full space-y-5" onSubmit={handleRegis}>
                    <div className="space-y-4">
                        <FormInput
                            type="text"
                            placeholder="Nama Lengkap"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}

                        <FormInput
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

                    <div className="flex items-center justify-center">
                        <Button title="Daftar" type="submit" />
                    </div>
                </form>

                <div className="w-full flex items-center my-4">
                    <div className="flex-1 border-t border-green-500"></div>
                    <p className="text-md text-center text-green-500 px-4">Atau Daftar Dengan</p>
                    <div className="flex-1 border-t border-green-500"></div>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <Button title="Google" icon={faGoogle} />
                </div>

                <p className="text-sm text-right font-medium text-gray-600">
                    Anda pengguna lama?{' '}
                    <span className="text-green-500 cursor-pointer" onClick={onLogin}>
                        Masuk
                    </span>
                </p>

                <ToastContainer /> {/* Render the ToastContainer */}
            </div>

            <div className="flex flex-col justify-between md:w-1/2">
                <h1 className="text-center text-[18px] md:text-[24px] text-white font-bold mb-4 hidden md:block">
                    Ayo buat akun segera!
                </h1>
                <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block">
                    {/* You can put an image or other content here if needed */}
                </div>
            </div>
            <img
                src="/assets/images/imgAuth2.png"
                alt=""
                className="absolute hidden md:block  -bottom-1 -right-2 object-cover  w-[400px] h-[400px]"
            />
        </>
    );
}

export default RegisterForm;
