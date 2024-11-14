import React, { useState } from 'react';
import DetailPembayaran from '../../../components/DetailPembayaran'; // Import komponen DetailPembayaran

const orderData = [
  {
    id: 1,
    alamat: 'Jln. Merpati, Bakung ujung',
    kota: 'Jambi',
    kelas: 'Yoga',
    namaPelatih: 'Baihaqi Khaizan',
    tanggalPesanan: '25 Oktober 2024, 11:49',
    metodePembayaran: 'Transfer - Online',
    fotoPemesan: '/assets/images/kelasuser/yoga.jpg',
    jumlah: 'Rp. 150.000',
    statusPembayaran: 'Lunas',
    sesi: 'Sesi 1',
    namaMitra: 'GYM EXO',
  },
  {
    id: 2,
    alamat: 'Jln. Merpati, Bakung ujung',
    kota: 'Jambi',
    kelas: 'Zumba',
    namaPelatih: 'Fachlufi Gred',
    tanggalPesanan: '25 Oktober 2024, 11:49',
    metodePembayaran: 'Transfer - Online',
    jumlah: 'Rp. 150.000',
    fotoPemesan: '/assets/images/kelasuser/zumba.jpg',
    statusPembayaran: 'Diproses',
    sesi: 'Sesi 2',
    namaMitra: 'Hotel Ratu',
  },
  {
    id: 3,
    alamat: 'Jln. Merpati, Bakung ujung',
    kota: 'Jambi',
    kelas: 'Cardio',
    namaPelatih: 'Rina Putri',
    tanggalPesanan: '26 Oktober 2024, 10:30',
    metodePembayaran: 'Transfer - Online',
    jumlah: 'Rp. 150.000',
    fotoPemesan: '/assets/images/kelasuser/cardio.jpg',
    statusPembayaran: 'Ditolak',
    sesi: 'Sesi 3',
    namaMitra: 'Hotel swiss bel',
  },
  // Tambahkan lebih banyak data jika perlu
];

export default function Pembayaran() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
              <img src={order.fotoPemesan} alt="Foto Pemesan"
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                order.statusPembayaran === 'Lunas' ? 'bg-green-500' 
                : order.statusPembayaran === 'Diproses' ? 'bg-yellow-500'
                : 'bg-red-500'
              }`}>
                {order.statusPembayaran}
              </span>
            </div>
            <div className="mt-4">
              {[
                { label: "Nama Mitra", value: order.namaMitra },
                { label: "Kelas", value: order.kelas },
                { label: "Tanggal Pembayaran", value: order.tanggalPesanan },
                { label: "Metode Pembayaran", value: order.metodePembayaran },
                { label: "Total", value: order.jumlah },
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
