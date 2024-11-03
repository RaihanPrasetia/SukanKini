import React from 'react';

function RegisterForm({ onLogin }) {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create Your Account</h2>
            
            <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200"
            />
            <input
                type="email"
                placeholder="Email Address"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200"
            />

            <button
                className="bg-green-500 text-white w-full py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
                Register
            </button>
            
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={onLogin}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
