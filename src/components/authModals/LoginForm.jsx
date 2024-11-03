import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications

import FormInput from '../FormInput'; // Ensure this path is correct
import Button from '../Button'; // Ensure this path is correct
import AuthContext from '../../pages/Layouts/AuthContext'; // Import AuthContext

function LoginForm({ onForgotPassword, onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': 'SUK4NK1NI-E4SYKEY',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Get the response data
                console.log('Login successful:', data); // Log the response data
                login(data.token); // Call the login function with the token
                toast.success('Login successful! Redirecting to dashboard...'); // Success notification
                navigate('/dashboard');
            } else {
                const errorData = await response.json(); // Get the error message
                console.error('Login failed:', errorData); // Log the error response
                toast.error(errorData.message || 'Login failed. Please check your credentials.'); // Error notification
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again.'); // General error notification
        }
    };

    return (
        <div className='w-full flex flex-col items-center p-6 bg-white rounded-lg shadow-md'>
            <h1 className="text-2xl font-bold mb-6 text-green-500 text-center">
                MASUK KE AKUN SUKANKINI
            </h1>
            <form className='w-full space-y-5' onSubmit={handleLogin}>
                <div className='space-y-4'>
                    <FormInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className='text-sm text-right font-medium text-gray-600'>
                    Password Akun Anda Lupa?{' '}
                    <span className='text-green-500 cursor-pointer' onClick={onForgotPassword}>Klik Disini</span>
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
                <Button title='Google' />
            </div>
            <p className='text-sm text-center font-medium text-gray-600'>
                Anda pengguna baru?{' '}
                <span className='text-green-500 cursor-pointer' onClick={onRegister}>Daftar Disini</span>
            </p>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default LoginForm;
