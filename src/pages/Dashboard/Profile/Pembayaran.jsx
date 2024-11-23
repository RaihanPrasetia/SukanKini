import React, { useState, useEffect } from 'react';
import paymentService from '../../../service/User/profilePayment';
import DetailPembayaran from '../../../components/DetailPembayaran';

export default function Pembayaran() {
  const [orderData, setOrderData] = useState([]); // State to store payment data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch payment data from API
  const fetchPayments = async () => {
    try {
      const payments = await paymentService.getUserPayments();
      setOrderData(payments); // Set order data with fetched payments
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError(err.message); // Set error message in case of failure
      setLoading(false); // Set loading to false even if error occurs
    }
  };

  // Fetch payments when the component mounts
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

  // Display loading or error states
  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl shadow-lg w-full max-w-4xl mx-auto space-y-8">
      <h3 className="text-3xl font-bold text-blue-600 text-center">Informasi Pesanan</h3>
      <p className="text-gray-700 text-center text-lg mb-6">
        Nikmati kelas dan fasilitas yang telah Anda pilih!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {orderData.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${order.paymentStatus === 'Diterima'
                  ? 'bg-green-500'
                  : order.paymentStatus === 'Diproses'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                  }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="mt-6">
              {[
                { label: 'Nama Mitra', value: (order.to?.name || 'N/A').toUpperCase() },
                { label: 'Kelas', value: order.classInfo?.name || 'N/A' },
                { label: 'Tanggal Pembayaran', value: new Date(order.createdAt).toLocaleString() },
                { label: 'Total', value: `Rp. ${order.total.toLocaleString()}` },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-none">
                  <p className="text-gray-600 font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-800 text-sm">: {item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                className="px-6 py-3 rounded-full text-lg font-semibold bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
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
