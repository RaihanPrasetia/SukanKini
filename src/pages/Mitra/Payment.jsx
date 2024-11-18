import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import bankService from "../../service/bankService";
import paymentService from "../../service/paymentService"; // Import service

export default function HomeMitra({ sidebarOpen }) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // Payment status state
    const [bankInfo, setBankInfo] = useState(null); // Tambahkan state untuk informasi bank

    const promos = [
        { id: 1, name: "Promo A", price: 100000 },
        { id: 2, name: "Promo B", price: 150000 },
        { id: 3, name: "Promo C", price: 200000 },
    ];

    useEffect(() => {
        // Mendapatkan informasi bank dengan ID tertentu
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

        fetchBankInfo();
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
            const response = await paymentService.createPayment({
                bankId: bankInfo.id,
                total: selectedPromo.price,
                paymentProof,
            });

            Swal.fire({
                title: "Sukses",
                text: response.message,
                icon: "success",
                confirmButtonText: "OK",
            });

            // Set payment completion status after successful payment
            setIsPaymentCompleted(true);  // Mark payment as completed

            // Fetch the payment status after submission
            fetchPaymentStatus(response.paymentId);

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // Fetch payment status
    const fetchPaymentStatus = async (paymentId) => {
        try {
            const status = await paymentService.getPaymentStatus(paymentId);
            setPaymentStatus(status);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to fetch payment status",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div
            className={`flex flex-col bg-gray-100 items-start justify-start px-4 sm:p-16 py-24 lg:pt-32 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
                }`}
        >
            {!isPaymentCompleted ? (
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

            {paymentStatus && (
                <div className="flex flex-col w-full bg-blue-500 rounded-lg shadow-lg p-6 mb-3">
                    <h1 className="text-xl md:text-2xl w-[80%] font-bold text-white text-left">
                        Status Pembayaran: {paymentStatus}
                    </h1>
                </div>
            )}

            {!isPaymentCompleted && (
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
    );
}
