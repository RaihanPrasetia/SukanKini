import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import bankService from "../../service/bankService";
import paymentService from "../../service/paymentService"; // Import service
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import { FaUser, FaSignOutAlt } from 'react-icons/fa'

export default function HomeMitra() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
    const [bankInfo, setBankInfo] = useState(null); // State untuk informasi bank
    const [payments, setPayments] = useState([]);
    const { logout, userName, user } = useAuth();
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Get userName and user from useAuth
    const handleLogout = () => {
        handleMenuClick();
        logout();
        navigate('/');
    };
    const handleMenuClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown')) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);
    const promos = [
        { id: 1, name: "Promo A", price: 100000 },
        { id: 2, name: "Promo B", price: 150000 },
        { id: 3, name: "Promo C", price: 200000 },
    ];

    // Fungsi untuk memeriksa status pembayaran pertama
    const isFirstPaymentPending = payments.length > 0 && payments[0].paymentStatus === "Diproses";

    useEffect(() => {
        // Fetch informasi bank
        const fetchBankInfo = async () => {
            try {
                const bankData = await bankService.getBankById(1); // Ganti dengan ID bank yang relevan
                setBankInfo({
                    id: bankData.id,
                    bankName: bankData.brand,
                    accountNumber: bankData.no_rek,
                    accountHolder: bankData.an,
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        };

        // Fetch data pembayaran
        const fetchPayments = async () => {
            try {
                const paymentData = await paymentService.getPayments();
                setPayments(paymentData);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Gagal mengambil data pembayaran.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        };

        fetchBankInfo();
        fetchPayments();
    }, []);

    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);

    const handlePromoChange = (promo) => {
        setSelectedPromo(promo);
    };

    const handleFileUpload = (e) => {
        setPaymentProof(e.target.files[0]);
    };

    const handlePaymentSubmit = async () => {
        // Validasi jika promo atau bukti pembayaran belum dipilih
        if (!selectedPromo || !paymentProof) {
            Swal.fire({
                title: "Perhatian",
                text: "Silakan pilih promo dan unggah bukti pembayaran.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            // Mengirim data pembayaran ke service
            const response = await paymentService.createPayment({
                bankId: bankInfo.id,
                total: selectedPromo.price,
                paymentProof,
            });

            // Debugging: Cek response untuk mengetahui struktur data yang dikembalikan
            console.log(response);  // Hapus ini setelah perbaikan

            // Cek apakah ada payment data dalam response
            if (response && response.payment) {
                Swal.fire({
                    title: "Sukses",
                    text: `Pembayaran berhasil untuk promo ${selectedPromo.name}.`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                // Set status pembayaran selesai
                setIsPaymentCompleted(true);

                // Refresh data pembayaran setelah sukses
                const updatedPayments = await paymentService.getPayments();
                setPayments(updatedPayments);

                closePaymentModal(); // Menutup modal pembayaran
            } else {
                // Jika respons tidak sesuai dengan format yang diharapkan
                Swal.fire({
                    title: "Error",
                    text: "Pembayaran gagal. Coba lagi nanti.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }

        } catch (error) {
            // Menangani error saat request API gagal
            console.error("Error during payment submission:", error);

            Swal.fire({
                title: "Error",
                text: error.message || "Terjadi kesalahan saat memproses pembayaran. Coba lagi nanti.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (<>
        <nav
            className='flex  items-center justify-end px-16 w-full bg-green-500 text-white py-4 shadow-md transition-all duration-300 '
        >

            {/* Profile and Logout Section */}
            <div
                className="relative flex items-center profile-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="flex items-center text-lg hover:text-green-600 transition duration-300 space-x-2 cursor-pointer">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                    ) : (
                        <img
                            src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Default Profile"
                            className="h-12 w-12 rounded-full"
                        />
                    )}
                    <span className='text-white font-bold text-xl hidden lg:block'>{userName || "Profile"}</span> {/* Display userName here */}
                </div>

                {/* Dropdown Menu for Profile and Logout */}
                {dropdownOpen && (
                    <div className="absolute right-0 top-[60px] mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
                        <Link
                            onClick={handleMenuClick}
                            to="/mitra/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-300 transition duration-200 rounded-md"
                        >
                            <FaUser className='inline mr-2' />
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-300 transition duration-200 rounded-md"
                        >
                            <FaSignOutAlt className="inline mr-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
        <div
            className='flex flex-col bg-gray-100 items-start justify-start px-4 sm:p-16 py-24 lg:pt-32 transition-all duration-300 '
        >
            {isFirstPaymentPending ? (
                <div className="flex flex-col w-full bg-yellow-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Pembayaran Anda sedang ditinjau oleh admin. Silakan menunggu konfirmasi lebih lanjut.
                    </h1>
                </div>
            ) : !isPaymentCompleted ? (
                <div className="flex flex-col w-full bg-red-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Untuk melanjutkan, silakan lakukan pembayaran terlebih dahulu dengan memilih promo yang tersedia.
                    </h1>
                </div>
            ) : (
                <div className="flex flex-col w-full bg-green-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Pembayaran berhasil. Terima kasih!
                    </h1>
                </div>
            )}

            {/* Hanya tampilkan promo jika pembayaran pertama tidak diproses */}
            {!isFirstPaymentPending && (
                <div className="w-full sm:w-1/3 lg:w-max p-6 rounded-2xl bg-opacity-75 bg-white text-white shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-black">Promo</h2>
                    <div className="flex gap-4">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className={`cursor-pointer p-4 rounded-lg shadow-lg ${selectedPromo?.id === promo.id ? "bg-green-500" : "bg-gray-700"}`}
                                onClick={() => handlePromoChange(promo)}
                            >
                                <h3 className="text-lg font-semibold">{promo.name}</h3>
                                <p className="text-sm">Harga: Rp. {promo.price}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={openPaymentModal} className="mt-4 bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600 transition font-medium">
                        Lanjutkan Pembayaran
                    </button>
                </div>
            )}

            {/* Tabel Data Pembayaran */}
            <div className="mt-6 w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Riwayat Pembayaran</h2>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">No</th>
                            <th className="border border-gray-300 px-4 py-2">Bukti</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                            <th className="border border-gray-300 px-4 py-2">Status Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {payment.paymentProof ? (
                                        <img
                                            src={`/bukti/${payment.paymentProof}`}
                                            alt={`Bukti Pembayaran ${payment.id}`}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-red-500">No Proof</span>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Rp. {payment.total}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPaymentModalOpen && bankInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-semibold text-center mb-6">Pembayaran</h2>
                        <p className="text-lg mb-4">
                            Silakan transfer pembayaran sesuai dengan informasi rekening di bawah ini dan unggah bukti pembayaran
                            di bawah.
                        </p>
                        <div className="mb-6">
                            {selectedPromo && (
                                <div className="mb-4">
                                    <h3 className="font-semibold">Total Pembayaran:</h3>
                                    <p className="text-xl font-bold">Rp. {selectedPromo.price}</p>
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="font-semibold">Informasi Rekening:</h3>
                                <p>Bank: {bankInfo.bankName}</p>
                                <p>No. Rekening: {bankInfo.accountNumber}</p>
                                <p>Atas Nama: {bankInfo.accountHolder}</p>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="block w-full p-2 border border-gray-300 rounded-md mb-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={closePaymentModal}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                            >
                                Kirim Bukti Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>

    );
}

