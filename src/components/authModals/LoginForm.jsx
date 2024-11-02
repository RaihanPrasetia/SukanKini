import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput';
import Button from '../Button';
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
                alert('Login successful!'); // Alert message for successful login
                navigate('/dashboard');
            } else {
                const errorData = await response.json(); // Get the error message
                console.error('Login failed:', errorData); // Log the error response
                alert(errorData.message || 'Login failed. Please check your credentials.'); // Show error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='w-full flex flex-col'>
            <form className='w-full space-y-5' onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold mb-4 text-center text-green-500">
                    MASUK KE AKUN SUKANKINI
                </h1>
                <div className='space-y-2'>
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
                <p className='text-sm text-right font-medium'>
                    Password Akun Anda Lupa?{' '}
                    <span className='text-green-500' onClick={onForgotPassword}>Klik Disini</span>
                </p>
                <div className='flex items-center justify-center'>
                    <Button title='Login' type={'submit'} />
                </div>
            </form>
            <div className="w-full flex items-center">
                <div className="flex-1 border-t border-green-500"></div>
                <p className="text-md text-center text-green-500 px-4">Atau Masuk Dengan</p>
                <div className="flex-1 border-t border-green-500"></div>
            </div>
            <div className='flex items-center justify-center'>
                <Button title='Google' />
            </div>
            <p className='text-sm text-center font-medium'>
                Anda pengguna baru?{' '}
                <span className='text-green-500' onClick={onRegister}>Daftar Disini</span>
            </p>
        </div>
    );
}

export default LoginForm;
