import React, { useState } from 'react';

const Pembayaran = () => {
    // Sample data for payment records
    const [payments, setPayments] = useState([
        {
            id: 1,
            name: 'John Doe',
            time: '10:00 AM',
            day: 'Monday',
            className: 'Yoga Class A',
            phone: '08123456789',
            proof: 'payment-proof-1.jpg',
            status: 'Proses',
        },
        {
            id: 2,
            name: 'Jane Smith',
            time: '02:00 PM',
            day: 'Tuesday',
            className: 'Pilates Class B',
            phone: '08987654321',
            proof: 'payment-proof-2.jpg',
            status: 'Diterima',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            time: '04:00 PM',
            day: 'Wednesday',
            className: 'Zumba Class C',
            phone: '08555555555',
            proof: 'payment-proof-3.jpg',
            status: 'Ditolak',
        },
        // Add more payment records as needed
    ]);

    // Handle the acceptance of a payment
    const handleAccept = (id) => {
        setPayments(prevPayments =>
            prevPayments.map(payment =>
                payment.id === id ? { ...payment, status: 'Diterima' } : payment
            )
        );
    };

    // Handle the rejection of a payment
    const handleReject = (id) => {
        setPayments(prevPayments =>
            prevPayments.map(payment =>
                payment.id === id ? { ...payment, status: 'Ditolak' } : payment
            )
        );
    };

    // Handle viewing the payment proof (e.g., a modal or alert)
    const handleView = (proof) => {
        alert(`Viewing payment proof: ${proof}`);
        // You can open a modal or navigate to the proof image URL instead
    };

    return (
        <div className="w-full bg-gray-50 p-6  py-24 lg:pt-32 rounded-lg shadow-lg min-h-[80vh]">
            <h2 className="text-3xl font-semibold mb-6 text-green-600">Daftar Pembayaran Member</h2>

            {/* Responsive Table Container */}
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
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id} className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{payment.name}</td>
                                <td className="px-4 py-2">{payment.time}</td>
                                <td className="px-4 py-2">{payment.day}</td>
                                <td className="px-4 py-2">{payment.className}</td>
                                <td className="px-4 py-2">{payment.phone}</td>
                                <td className="px-4 py-2">
                                    <a
                                        href={`/uploads/${payment.proof}`}
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleView(payment.proof);
                                        }}
                                    >
                                        Lihat Bukti
                                    </a>
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${payment.status === 'Proses'
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : payment.status === 'Diterima'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-red-200 text-red-800'
                                            }`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 space-x-2 space-y-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                        onClick={() => handleAccept(payment.id)}
                                    >
                                        Diterima
                                    </button>
                                    <button
                                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                        onClick={() => handleReject(payment.id)}
                                    >
                                        Ditolak
                                    </button>
                                    <button
                                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        onClick={() => handleView(payment.proof)}
                                    >
                                        Lihat
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pembayaran;
