import React, { useState, useEffect } from 'react';
import paymentService from '../../../service/User/profilePayment';
import DetailPembayaran from '../../../components/DetailPembayaran';

export default function Pembayaran() {
  const [orderData, setOrderData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching payment data
  const fetchPayments = async () => {
    try {
      const payments = await paymentService.getUserPayments();
      setOrderData(payments);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Helper function to format time as HH:MM
  const formatTime = (date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin text-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-xl font-bold">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="items-center justify-center p-6 flex flex-col rounded-lg bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-2xl w-full min-h-screen mx-auto animate__animated animate__fadeInUp">

      <h3 className="text-blue-600 font-extrabold text-4xl mb-6 text-center animate__animated animate__zoomIn">
        INFORMASI PESANAN
      </h3>
      <p className="text-gray-600 mb-8 text-center text-lg animate__animated animate__fadeInUp animate__delay-1s">
        Nikmati kelas dan fasilitas yang telah Anda pilih!
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {orderData.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-300 shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col items-center mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                  order.paymentStatus === 'Diterima'
                    ? 'bg-green-500'
                    : order.paymentStatus === 'Diproses'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="space-y-2">
              {[ 
                { label: 'Nama Mitra', value: (order.to?.name || 'N/A').toUpperCase() },
                { label: 'Kelas', value: order.classInfo?.name || 'N/A' },
                { label: 'Tanggal Pembayaran', value: `${new Date(order.createdAt).toLocaleDateString()} ${formatTime(order.createdAt)}` },
                { label: 'Total', value: `Rp. ${order.total.toLocaleString()}` },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-1 border-b border-gray-200 last:border-none">
                  <p className="text-gray-600 font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-800 text-sm">: {item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                className="px-5 py-3 rounded-full text-lg font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                onClick={() => openModal(order)}
              >
                Detail Pesanan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <DetailPembayaran order={selectedOrder} closeModal={closeModal} />
      )}
    </div>
  );
}
