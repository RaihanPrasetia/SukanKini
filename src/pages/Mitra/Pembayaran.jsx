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
    <div className="overflow-x-auto bg-white shadow-lg sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600 border border-gray-300">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-500 to-indigo-600">
                <tr>
                    <th className="px-6 py-4 border-b">No</th>
                    <th className="px-6 py-4 border-b">Nama Anggota</th>
                    <th className="px-6 py-4 border-b">Jam</th>
                    <th className="px-6 py-4 border-b">Hari</th>
                    <th className="px-6 py-4 border-b">Nama Kelas</th>
                    <th className="px-6 py-4 border-b">Nomor HP</th>
                    <th className="px-6 py-4 border-b">Bukti Pembayaran</th>
                    <th className="px-6 py-4 border-b">Total</th>
                    <th className="px-6 py-4 border-b">Status</th>
                    <th className="px-6 py-4 border-b">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {payments.length === 0 ? (
                <tr>
                    <td colSpan="10" className="px-6 py-4 text-xl text-center text-gray-600 font-semibold border-b">
                        Belum ada pembayaran
                    </td>
                </tr>
                ) : (
                payments.map((payment, index) => (
                <tr key={payment.id}
                    className="border-b border-gray-200 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out">
                    <td className="px-6 py-4 border-b">{index + 1}</td>
                    <td className="px-6 py-4 border-b">{payment.name}</td>
                    <td className="px-6 py-4 border-b">
                        {payment.schedules.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {payment.schedules.map((schedule, idx) => (
                            <li key={idx}>{schedule.jam}</li>
                            ))}
                        </ul>
                        ) : "-"}
                    </td>
                    <td className="px-6 py-4 border-b">
                        {payment.schedules.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {payment.schedules.map((schedule, idx) => (
                            <li key={idx}>{schedule.hari}</li>
                            ))}
                        </ul>
                        ) : "-"}
                    </td>
                    <td className="px-6 py-4 border-b">{payment.className}</td>
                    <td className="px-6 py-4 border-b">{payment.phone}</td>
                    <td className="px-6 py-4 border-b">
                        <button className="text-blue-600 hover:text-blue-800 focus:outline-none" onClick={()=>
                            handleView(payment)}
                            >
                            Lihat Bukti
                        </button>
                    </td>
                    <td className="px-6 py-4 border-b">{formatRupiah(payment.total)}</td>
                    <td className="px-6 py-4 border-b">
                        <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                            payment.status==="Diproses" ? "bg-yellow-200 text-yellow-800" : payment.status==="Diterima"
                            ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800" }`}>
                            {payment.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 border-b space-x-2">
                        {payment.status === "Diproses" && (
                        <>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-200"
                                onClick={()=> handleAccept(payment.id)}
                                >
                                Terima
                            </button>
                            <button
                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-all duration-200"
                                onClick={()=> handleReject(payment.id)}
                                >
                                Tolak
                            </button>
                        </>
                        )}
                    </td>
                </tr>
                ))
                )}
            </tbody>
        </table>
    </div>


    )}

    {/* Modal */}
    {modalOpen && selectedPayment && (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 p-4">
    <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Bukti Pembayaran</h3>
            <h3 className={`inline-block px-4 py-2 text-sm font-semibold rounded-full
                ${selectedPayment.status === "Diproses" ? "bg-yellow-500 text-white" :
                selectedPayment.status === "Diterima" ? "bg-green-500 text-white" : "bg-red-500 text-white" }`}>
                {selectedPayment.status}
            </h3>
        </div>

        <div className="mb-6">
            <img src={`/bukti/${selectedPayment.proof}`} alt="Payment Proof"
                className="w-full h-64 object-cover rounded-lg shadow-sm mb-4" />
            <div className="space-y-2">
                <div className="text-sm text-gray-700">
                    <strong>Nama Pengirim:</strong> {selectedPayment.name}
                </div>
                <div className="text-sm text-gray-700">
                    <strong>Bank:</strong> {selectedPayment.bank.bankBrand}
                </div>
                <div className="text-sm text-gray-700">
                    <strong>Nama Rekening:</strong> {selectedPayment.bank.accountName}
                </div>
                <div className="text-sm text-gray-700">
                    <strong>Nomor Rekening:</strong> {selectedPayment.bank.accountNumber}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                    <strong>Total:</strong> {formatRupiah(selectedPayment.total)}
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center mt-6 space-x-4">
            <button onClick={closeModal} className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-all duration-200">
                Tutup
            </button>

            {selectedPayment.status === "Diproses" && (
                <div className="flex gap-4 w-full md:w-auto justify-start">
                    <button 
                        className="w-full md:w-auto px-6 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-200"
                        onClick={() => handleModalAction("accept")}
                    >
                        Terima
                    </button>
                    <button 
                        className="w-full md:w-auto px-6 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-200"
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