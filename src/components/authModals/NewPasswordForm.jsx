import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { resetPassword } from "../../controllers/authController";

function NewPasswordForm({ reEmail, onLogin }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!newPassword.trim() || newPassword.length < 8) {
            newErrors.newPassword = 'Password harus setidaknya 8 karakter.';
        }

        if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Konfirmasi password tidak cocok.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await resetPassword(reEmail, newPassword);
            Swal.fire({
                title: "Berhasil!",
                text: "Password berhasil diubah. Silakan login.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                onLogin(); // Alihkan kembali ke halaman login
            });
        } catch (error) {
            toast.error('Gagal mengatur ulang password.');
        }
    };

    return (
        <div className="w-full flex rounded-xl  h-[500px] p-4 md:p-0 md:w-full bg-green-500">
            <div className="flex flex-col w-[400px] justify-between p-6">
                <h1 className="items-start justify-start text-center text-[18px] md:text-[16px] text-white font-bold mb-4 hidden md:block">
                    Tenang, kami disini untuk membantu anda!
                </h1>
                <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block"></div>
                <div className="md:h-auto overflow-hidden bg-green-500 hidden md:block"></div>
            </div>
            <img
                src="/assets/images/authForgot.png"
                alt=""
                className="absolute hidden md:block -bottom-1 -left-10 object-cover w-[340px] h-[420px]"
            />
            <div className="w-full flex flex-col justify-center items-center p-[80px] gap-6 bg-white rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-center text-green-600">
                        Atur Ulang Kata Sandi
                    </h2>
                    <p className="text-center text-[14px] font-semibold text-green-500">
                        Masukkan kata sandi baru Anda di bawah ini.
                    </p>
                </div>

                <form
                    className="flex flex-col items-center gap-2 justify-center w-full"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="password"
                        placeholder="Password Baru"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, newPassword: undefined }));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200 shadow-sm"
                    />
                    {errors.newPassword && (
                        <p className="text-red-500">{errors.newPassword}</p>
                    )}

                    <input
                        type="password"
                        placeholder="Konfirmasi Password Baru"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-200 shadow-sm"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="bg-green-500 px-3 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>

                <button
                    className="text-green-500 w-full text-center font-semibold hover:underline"
                    onClick={onLogin}
                >
                    Kembali ke Login
                </button>
            </div>
        </div>
    );
}

export default NewPasswordForm;
