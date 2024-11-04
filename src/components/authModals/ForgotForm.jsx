import React from 'react';
import FormInput from '../assets/FormInput';

function ForgotForm({ onSendOTP, onLogin }) {
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-600">Forgot Password</h2>

            <FormInput
                type="email"
                placeholder="Enter your email address"
                className="w-full mb-6 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition duration-200 shadow-sm"
            />

            <button
                onClick={onSendOTP}
                className="bg-yellow-500 text-white w-full py-4 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            >
                Send OTP
            </button>

            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="text-md text-center text-gray-600 px-4">OR</p>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
                className="text-blue-500 w-full text-center font-semibold hover:underline"
                onClick={onLogin}
            >
                Back to Login
            </button>
        </div>
    );
}

export default ForgotForm;
