import React from 'react';

function OtpForm({ onConfirmOTP, onLogin }) {
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">OTP Confirmation</h2>

            <input
                type="text"
                placeholder="Enter OTP"
                className="w-full mb-6 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition duration-200 shadow-sm"
            />

            <button
                onClick={onConfirmOTP}
                className="bg-purple-500 text-white w-full py-4 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 mb-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
                Confirm OTP
            </button>

            <button
                className="text-blue-500 w-full text-center font-semibold hover:underline"
                onClick={onLogin}
            >
                Back to Login
            </button>
        </div>
    );
}

export default OtpForm;
