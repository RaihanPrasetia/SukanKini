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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-center justify-center p-6 flex flex-col rounded-lg bg-gray-100 shadow-xl w-full h-full max-w-none mx-auto animate__animated animate__fadeInUp">
      <h3 className="text-blue-600 font-bold text-3xl mb-4 text-center animate__animated animate__zoomIn">
        INFORMASI PESANAN
      </h3>
      <p className="text-gray-700 mb-8 text-center animate__animated animate__fadeInUp animate__delay-1s">
        Nikmati kelas dan fasilitas yang telah Anda pilih!
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {orderData.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
            <div className="flex flex-col items-center">
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
            <div className="mt-4">
              {[
                { label: 'Nama Mitra', value: (order.to?.name || 'N/A').toUpperCase() },
                { label: 'Kelas', value: order.classInfo?.name || 'N/A' },
                { label: 'Tanggal Pembayaran', value: new Date(order.createdAt).toLocaleString() },
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
                className="px-5 py-2 rounded-full text-lg font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300 animate__animated animate__fadeIn"
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
