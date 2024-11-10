import React, { useState } from 'react';
import { toast } from 'react-toastify';

function OtpFormMitra({ onConfirmOTPMitra, onRegisterMitra }) {
    const [enteredOtp, setEnteredOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitMitra = async (e) => {
        e.preventDefault();
        if (enteredOtp.trim() === '') {
            toast.error('OTP tidak boleh kosong.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(''); // Reset error message

        try {
            await onConfirmOTPMitra(enteredOtp); // Assuming this is a promise
            setEnteredOtp(''); // Clear the OTP input on success
            toast.success('OTP berhasil dikonfirmasi!');
        } catch (error) {
            setErrorMessage('OTP tidak valid. Silakan coba lagi.');
            toast.error('OTP tidak valid. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center rounded-lg space-x-6 bg-yellow-500">
            <img
                src="/assets/images/authotp.png"
                alt="OTP Illustration"
                className="absolute hidden md:block -bottom-1 -left-8 object-cover w-[320px] h-[320px]"
            />
            <div className='w-1/2 flex h-full justify-start items-start py-5'>
                <h1 className='text-center text-lg text-white font-bold'>
                    Tinggal satu langkah lagi, nih cek email Anda!
                </h1>
            </div>
            <div className='w-full h-full justify-center flex flex-col bg-white shadow-lg p-6 rounded-lg'>
                <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Konfirmasi OTP</h2>
                <form className="w-full space-y-5" onSubmit={handleSubmitMitra}>
                    <input
                        type="text"
                        placeholder="Masukkan OTP"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        className={`border border-gray-300 rounded-lg p-2 w-full ${errorMessage ? 'border-red-500' : ''}`}
                        maxLength={5}
                        aria-label="Masukkan OTP"
                    />
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    <button
                        type="submit"
                        className={`bg-yellow-500 text-white py-2 rounded-lg w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Mengonfirmasi...' : 'Konfirmasi'}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={onRegisterMitra} // Calls the back action when clicked
                    className="mt-4 text-yellow-500 underline"
                >
                    Kembali ke Halaman Sebelumnya
                </button>
            </div>
        </div>
    );
}

export default OtpFormMitra;