import React, { useState, useEffect } from "react";
import paymentService from "../../service/paymentService";
import Swal from "sweetalert2";

const Pembayaran = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility
    const [selectedPayment, setSelectedPayment] = useState(null); // Store the selected payment details

    // Fetch payment data
    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const paymentData = await paymentService.getPayments();
                const formattedPayments = paymentData.map((payment) => ({
                    id: payment.id,
                    name: payment.from?.name || "Tidak ada nama",
                    schedules: payment.schedules || [],
                    className: payment.classInfo?.name || "Tidak ada kelas",
                    phone: payment.from?.phoneNumber || "-",
                    proof: payment.paymentProof || "",
                    status: payment.paymentStatus || "Proses",
                    total: payment.total || '',
                    bank: payment.bank || {},
                }));
                setPayments(formattedPayments);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message || "Gagal mengambil data pembayaran.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Format number to Rupiah currency format
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    // Handle the acceptance of a payment
    const handleAccept = async (id) => {
        const result = await Swal.fire({
            title: 'Konfirmasi',
            text: "Apakah Anda yakin ingin menerima pembayaran ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Terima',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            try {
                const updatedPayment = await paymentService.updatePaymentById({
                    paymentId: id,
                    status: "Diterima",
                });

                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment.id === id ? { ...payment, status: updatedPayment.paymentStatus } : payment
                    )
                );

                Swal.fire({
                    title: 'Berhasil',
                    text: 'Pembayaran telah diterima.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Gagal memperbarui status pembayaran.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    // Handle the rejection of a payment
    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: 'Konfirmasi',
            text: "Apakah Anda yakin ingin menolak pembayaran ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Tolak',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            try {
                const updatedPayment = await paymentService.updatePaymentById({
                    paymentId: id,
                    status: "Ditolak",
                });

                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment.id === id ? { ...payment, status: updatedPayment.paymentStatus } : payment
                    )
                );

                Swal.fire({
                    title: 'Berhasil',
                    text: 'Pembayaran telah ditolak.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Gagal memperbarui status pembayaran.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    // Handle viewing the payment proof
    const handleView = (payment) => {
        setSelectedPayment(payment);
        setModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Handle action inside the modal (accept/reject)
    const handleModalAction = async (action) => {
        const actionText = action === "accept" ? "menerima" : "menolak";
        const result = await Swal.fire({
            title: 'Konfirmasi',
            text: `Apakah Anda yakin ingin ${actionText} pembayaran ini?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Ya, ${actionText}`,
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            try {
                const updatedPayment = await paymentService.updatePaymentById({
                    paymentId: selectedPayment.id,
                    status: action === "accept" ? "Diterima" : "Ditolak",
                });

                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment.id === selectedPayment.id ? { ...payment, status: updatedPayment.paymentStatus } : payment
                    )
                );

                Swal.fire({
                    title: 'Berhasil',
                    text: `Pembayaran telah ${actionText}.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || `Gagal ${actionText} pembayaran.`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }

        closeModal(); // Close modal after action
    };

    return (
        <div className="w-full bg-gray-50 p-6 py-24 lg:pt-32 rounded-lg shadow-lg min-h-[80vh]">
            <h2 className="text-3xl font-semibold mb-6 text-green-600">Daftar Pembayaran Member</h2>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Nama Anggota</th>
                                <th className="px-4 py-3">Jam</th>
                                <th className="px-4 py-3">Hari</th>
                                <th className="px-4 py-3">Nama Kelas</th>
                                <th className="px-4 py-3">Nomor HP</th>
                                <th className="px-4 py-3">Bukti Pembayaran</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment.id}
                                    className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{payment.name}</td>
                                    <td className="px-4 py-2">
                                        {payment.schedules.length > 0
                                            ? payment.schedules.map((schedule) => schedule.jam).join(", ")
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {payment.schedules.length > 0
                                            ? payment.schedules.map((schedule) => schedule.hari).join(", ")
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2">{payment.className}</td>
                                    <td className="px-4 py-2">{payment.phone}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleView(payment)}
                                        >
                                            Lihat Bukti
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">{formatRupiah(payment.total)}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${payment.status === "Diproses"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : payment.status === "Diterima"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2 space-y-2">
                                        {payment.status === "Diproses" && (
                                            <>
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                                    onClick={() => handleAccept(payment.id)}
                                                >
                                                    Terima
                                                </button>
                                                <button
                                                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                                    onClick={() => handleReject(payment.id)}
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && selectedPayment && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Bukti Pembayaran</h3>
                            <h3 className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${selectedPayment.status === "Diproses"
                                ? "bg-yellow-500 text-white"
                                : selectedPayment.status === "Diterima"
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                                }`}>{selectedPayment.status}</h3>
                        </div>
                        <div className="mb-4">
                            <img
                                src={`/bukti/${selectedPayment.proof}`}
                                alt="Payment Proof"
                                className="w-full h-72 mb-4 object-cover"
                            />
                            <div className="mb-2">
                                <strong>Nama Pengirim:</strong> {selectedPayment.name}
                            </div>
                            <div className="mb-2">
                                <strong>Bank:</strong> {selectedPayment.bank.bankBrand}
                            </div>
                            <div className="mb-2">
                                <strong>Nama Rekening:</strong> {selectedPayment.bank.accountName}
                            </div>
                            <div className="mb-2">
                                <strong>Nomor Rekening:</strong> {selectedPayment.bank.accountNumber}
                            </div>
                            <div className="mb-2">
                                <strong>Total:</strong> {formatRupiah(selectedPayment.total)}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 rounded-lg font-semibold text-white"
                            >
                                Tutup
                            </button>

                            {selectedPayment.status === "Diproses" && (
                                <div className="flex items-center gap-2 justify-start">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                        onClick={() => handleModalAction("accept")}
                                    >
                                        Terima
                                    </button>
                                    <button
                                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                        onClick={() => handleModalAction("reject")}
                                    >
                                        Tolak
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Pembayaran;
