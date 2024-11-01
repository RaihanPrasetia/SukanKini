// src/components/authModals/AuthForms/LoginForm.jsx
import React from 'react';
import FormInput from '../FormInput';
import { Link } from 'react-router-dom';
import Button from '../Button';

function LoginForm({ onForgotPassword, onRegister }) {
    return (
        <div className='w-full  space-y-5'>
            <h1 className="text-2xl font-bold mb-4 text-center text-green-500">MASUK KE AKUN SUKANKINI</h1>
            <div className='space-y-2'>
                <FormInput type="email" placeholder="Email"
                />
                <FormInput type="password" placeholder="Password"
                />
            </div>
            <p className='text-sm text-right font-medium'>Password Akun Anda Lupa? <Link className='text-green-500'>Klik Disini </Link></p>
            <div className='flex items-center justify-center'>

                <Button title={'Login'} />
            </div>
            <div className="w-full flex items-center">
                <div className="flex-1 border-t border-green-500"></div>
                <p className="text-md text-center text-green-500 px-4">Atau Masuk Dengan</p>
                <div className="flex-1 border-t border-green-500"></div>
            </div>
            <div className='flex items-center justify-center'>
                <Button title={'Google'} />
            </div>
            <p className='text-sm text-center font-medium'>Anda pengguna baru? <Link className='text-green-500'>Daftar Disini </Link></p>
        </div>
    );
}

export default LoginForm;
