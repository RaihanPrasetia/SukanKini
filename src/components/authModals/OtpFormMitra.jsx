import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function OtpFormMitra({ onConfirmOTPMitra, onRegisterMitra, reSendOtp, onMessage }) {
    const [enteredOtp, setEnteredOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (onMessage) {
            Swal.fire({
                title: 'Cek Email Anda',
                text: onMessage,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    }, [onMessage]);

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
    const handleResendOtp = () => {
        setIsResendDisabled(true);
        reSendOtp(); // Call the resend OTP function
        let timer = 60; // Countdown duration in seconds
        setCountdown(timer);

        const interval = setInterval(() => {
            timer -= 1;
            setCountdown(timer);
            if (timer <= 0) {
                clearInterval(interval);
                setIsResendDisabled(false);
            }
        }, 1000);
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
                        onClick={handleSubmitMitra}
                        type="submit"
                        className={`bg-yellow-500 text-white py-2 rounded-lg w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Mengonfirmasi...' : 'Konfirmasi'}
                    </button>
                </form>
                <div className='flex items-center justify-center rounded-lg'>
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className={`mt-4 ${isResendDisabled ? 'text-gray-400 cursor-not-allowed underline' : ' hover:bg-yellow-600 px-4 py-2 bg-yellow-500 text-white rounded-lg'} `}
                        disabled={isResendDisabled}
                    >
                        {isResendDisabled ? `${countdown} detik untuk mengirim ulang` : 'Kirim Ulang OTP'}
                    </button>
                </div>


                <button
                    type="button"
                    onClick={onRegisterMitra} // Calls the back action when clicked
                    className="mt-4 text-yellow-500 underline hover:text-yellow-600"
                >
                    Kembali ke Halaman Sebelumnya
                </button>

            </div>
        </div>
    );
}

export default OtpFormMitra;