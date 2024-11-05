import React, { useState } from 'react';
import { toast } from 'react-toastify';

function OtpForm({ onConfirmOTP }) {
    const [enteredOtp, setEnteredOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (enteredOtp.trim() === '') {
            toast.error('OTP tidak boleh kosong.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(''); // Reset error message

        try {
            await onConfirmOTP(enteredOtp); // Assuming this is a promise
            toast.success('OTP berhasil dikonfirmasi!');
        } catch (error) {
            setErrorMessage('OTP tidak valid. Silakan coba lagi.');
            toast.error('OTP tidak valid. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Konfirmasi OTP</h2>
            <form className="w-full space-y-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Masukkan OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className={`border border-gray-300 rounded-lg p-2 w-full ${errorMessage ? 'border-red-500' : ''}`}
                    maxLength={5}
                />
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                    type="submit"
                    className={`bg-green-500 text-white py-2 rounded-lg w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Mengonfirmasi...' : 'Konfirmasi'}
                </button>
            </form>
        </div>
    );
}

export default OtpForm;
