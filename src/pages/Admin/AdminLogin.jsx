import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../components/assets/FormInput';
import Button from '../../components/assets/Button';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../controllers/authController'; // Import login function
import UserModel from '../../constructors/UserModel'; // Assuming there's a User model like in your login form

function AdminLogin({ onForgotPassword, onRegister }) {
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

        // Validate email and password input
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Call the login function to authenticate the user
            const { token, user } = await login(email, password);

            // Initialize the user data using the User model
            const loggedInUser = new UserModel(user);

            // Check if the user is blocked
            if (loggedInUser.isUserBlocked()) {
                toast.error('Akun Anda diblokir. Silakan hubungi dukungan.');
                return;
            }

            // Check if the user's role is valid (admin or user)
            if (!loggedInUser.isAdmin()) {
                toast.error('Hanya admin yang dapat mengakses halaman ini.');
                return;
            }

            // Log the user in and store the token and user details in the context
            contextLogin(token, loggedInUser.getFormattedName(), loggedInUser.role);
            toast.success(`Selamat Bergabung, ${loggedInUser.getFormattedName()}`);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Gagal Masuk:', error);
            toast.error(error.message || 'Login gagal. Silakan coba lagi.');
        }
    };

    const handleMenuClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <div className="w-full flex rounded-xl p-4 md:p-0 md:w-full bg-green-500">
            <div className="w-full flex flex-col items-center p-6 bg-white rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-green-500 text-center">
                    MASUK KE AKUN ADMIN
                </h1>
                <form className="w-full space-y-5" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                            <FormInput
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
                        <span className="text-green-500 cursor-pointer" onClick={onForgotPassword}>
                            Dapatkan
                        </span>
                    </p>
                    <div className="flex items-center space-x-5 justify-center">
                        <Button title="Masuk" type="submit" className="text-nowrap" onClick={handleMenuClick} />
                    </div>
                </form>
                <p className="text-sm text-center font-medium text-gray-600 my-5">
                    Anda pengguna baru?{' '}
                    <span className="text-green-500 cursor-pointer" onClick={onRegister}>
                        Daftar
                    </span>
                </p>
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
        </div>
    );
}

export default AdminLogin;
