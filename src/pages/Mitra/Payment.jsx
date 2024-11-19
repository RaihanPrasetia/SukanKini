import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import bankService from "../../service/bankService";
import paymentService from "../../service/paymentService";

export default function HomeMitra({ sidebarOpen }) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [bankInfo, setBankInfo] = useState(null);

    const promos = [
        { id: 1, name: "Promo A", price: 100000 },
        { id: 2, name: "Promo B", price: 150000 },
        { id: 3, name: "Promo C", price: 200000 },
    ];

    useEffect(() => {
        const fetchBankInfo = async () => {
            try {
                const bankData = await bankService.getBankById(1);
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

    const handlePromoChange = (promo) => setSelectedPromo(promo);

    const handleFileUpload = (e) => setPaymentProof(e.target.files[0]);

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

            setIsPaymentCompleted(true);
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
            className={`flex flex-col items-start px-6 py-10 transition-all duration-300 ${
                sidebarOpen ? "ml-64" : "ml-0"
            }`}
        >
            <div className="w-full max-w-4xl mx-auto">
                {!isPaymentCompleted ? (
                    <div className="mb-6 p-6 bg-red-500 text-white rounded-lg shadow-lg">
                        <h1 className="text-xl font-bold">Selesaikan Pembayaran</h1>
                        <p className="mt-2">
                            Silakan lakukan pembayaran untuk melanjutkan menggunakan promo yang tersedia.
                        </p>
                        <button
                            onClick={openPaymentModal}
                            className="mt-4 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
                        >
                            Pilih Promo
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 p-6 bg-green-500 text-white rounded-lg shadow-lg">
                        <h1 className="text-xl font-bold">Pembayaran Berhasil</h1>
                        <p className="mt-2">Terima kasih telah melakukan pembayaran!</p>
                    </div>
                )}

                {paymentStatus && (
                    <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
                        <h1 className="text-xl font-bold">Status Pembayaran</h1>
                        <p className="mt-2">{paymentStatus}</p>
                    </div>
                )}

                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Pilih Promo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className={`p-4 rounded-lg border cursor-pointer ${
                                    selectedPromo?.id === promo.id
                                        ? "bg-green-100 border-green-500"
                                        : "bg-gray-100 border-gray-300 hover:shadow-md"
                                }`}
                                onClick={() => handlePromoChange(promo)}
                            >
                                <h3 className="font-semibold">{promo.name}</h3>
                                <p className="text-sm">Harga: Rp. {promo.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isPaymentModalOpen && bankInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Pembayaran</h2>
                        <p className="text-sm mb-4">
                            Silakan transfer pembayaran ke rekening berikut:
                        </p>
                        <div className="p-4 bg-gray-100 rounded-lg mb-4">
                            <p>Bank: {bankInfo.bankName}</p>
                            <p>No. Rekening: {bankInfo.accountNumber}</p>
                            <p>Atas Nama: {bankInfo.accountHolder}</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="mb-4 w-full p-2 border rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={closePaymentModal}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Kirim Bukti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
