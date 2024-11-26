import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import paymentService from '../../../service/User/profilePayment';
import DetailPembayaran from '../../../components/DetailPembayaran';

export default function Pembayaran() {
  const [orderData, setOrderData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

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

  // If there are no payments, show a message and a button to navigate to /kelas
  if (orderData.length === 0) {
    return (
      <div className="items-center justify-center  flex flex-col rounded-lg  w-full mx-auto animate__animated animate__fadeInUp">
        <h3 className="text-blue-500 text-4xl font-bold mb-6 text-center animate__animated animate__zoomIn">
          Data Pesanan Belum Ada
        </h3>
        <p className="text-gray-600 mb-8 text-center text-lg animate__animated animate__fadeInUp animate__delay-1s">
          Anda belum melakukan pembayaran atau pesanan.
        </p>
        <button
          onClick={() => navigate('/kelas')} // Navigate to /kelas
          className="px-5 py-3 rounded-full text-lg font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Kunjungi Kelas
        </button>
      </div>
    );
  }

  return (
    <div className="items-center justify-start flex flex-col rounded-lg pt-6 w-full  mx-auto animate__animated animate__fadeInUp">
      <h3 className="text-blue-600 text-4xl font-bold mb-6 text-center animate__animated animate__zoomIn">
        Riwayat Pesanan
      </h3>
      <p className="text-gray-600 mb-8 text-center text-lg animate__animated animate__fadeInUp animate__delay-1s">
        Nikmati kelas dan fasilitas yang telah Anda pilih!
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {orderData.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-300 hover:border hover:border-green-500 transition-all duration-300 transform"
          >
            {/* Payment Status Badge */}
            <div className="flex flex-col items-end mb-4">
              <span
                className={`px-4 py-1 rounded-full text-md font-semibold text-white ${order.paymentStatus === 'Diterima'
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : order.paymentStatus === 'Diproses'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : 'bg-gradient-to-r from-red-400 to-red-600'
                  } shadow-lg`}
              >
                {order.paymentStatus}
              </span>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              {[
                { label: 'Nama Mitra', value: (order.to?.name || 'N/A').toUpperCase() },
                { label: 'Kelas', value: order.classInfo?.name || 'N/A' },
                { label: 'Tanggal Pembayaran', value: `${new Date(order.createdAt).toLocaleDateString()} ${formatTime(order.createdAt)}` },
                { label: 'Total', value: `Rp. ${order.total.toLocaleString()}` },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-none">
                  <p className="text-gray-600 font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-6 text-center">
              <button
                className="px-4 py-1 rounded-full text-lg font-semibold bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 transition duration-300 transform"
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
