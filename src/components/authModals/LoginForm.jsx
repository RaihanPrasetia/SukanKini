// src/components/authModals/AuthForms/LoginForm.jsx
import React from 'react';
import FormInput from '../FormInput';

function LoginForm({ onForgotPassword, onRegister }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <FormInput type="email" placeholder="Email"
            />
            <FormInput type="password" placeholder="Password"
            />
            <button className="bg-blue-500 text-white w-full py-2 rounded mb-2 hover:bg-blue-600">Login</button>
            <button className="text-blue-500 w-full" onClick={onForgotPassword}>Forgot Password?</button>
            <button className="text-blue-500 w-full mt-2" onClick={onRegister}>Create an Account</button>
        </div>
    );
}

export default LoginForm;
