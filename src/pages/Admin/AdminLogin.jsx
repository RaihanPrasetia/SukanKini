import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../components/assets/FormInput';
import Button from '../../components/assets/Button';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../controllers/authController';
import UserModel from '../../constructors/UserModel';

function AdminLogin({ onForgotPassword, onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth();

    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = 'Masukkan Email';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Format email tidak valid.';
        }

        if (!password) {
            newErrors.password = 'Masukkan Password';
        } else if (password.length < 8) { newErrors.password = 'Password minimal 8 karakter.'; } return newErrors;
    }; const
        handleLogin = async (e) => {
            e.preventDefault();

            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            try {
                const { token, user } = await login(email, password);
                const loggedInUser = new UserModel(user);

                if (loggedInUser.isUserBlocked()) {
                    toast.error('Akun Anda diblokir. Silakan hubungi dukungan.');
                    return;
                }

                if (!loggedInUser.isAdmin()) {
                    toast.error('Hanya admin yang dapat mengakses halaman ini.');
                    return;
                }

                contextLogin(token, loggedInUser.getFormattedName(), loggedInUser.role);
                toast.success(`Selamat Bergabung, ${loggedInUser.getFormattedName()}`);
                navigate('/admin/dashboard');
            } catch (error) {
                console.error('Gagal Masuk:', error);
                toast.error(error.message || 'Login gagal. Silakan coba lagi.');
            }
        };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-600">
            <div
                className="bg-white shadow-2xl rounded-3xl p-10 sm:p-16 w-full max-w-lg transform scale-95 hover:scale-100 transition-transform duration-500">
                <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <FormInput type="email" placeholder="Masukkan Email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                            className="w-full border-gray-300 rounded-lg shadow-md focus:ring-indigo-500
                        focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div>
                        <FormInput type="password" placeholder="Masukkan Password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: undefined }));
                        }}
                            className="w-full border-gray-300 rounded-lg shadow-md focus:ring-indigo-500
                        focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
                    </div>
                    <div className="flex justify-center">
                        <Button title="Masuk" type="submit"
                            className="w-full py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all font-semibold" />
                    </div>


                </form>
                <div>
                    {/* Konten lainnya */}
                    <p className="text-center text-gray-500 mt-6">
                        <span className="text-indigo-500 cursor-pointer hover:underline" onClick={() => navigate('/')} //
                            Navigasi ke halaman beranda
                        >
                            Kembali ke Halaman Utama
                        </span>
                    </p>
                </div>
                <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false}
                    closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
}

export default AdminLogin;