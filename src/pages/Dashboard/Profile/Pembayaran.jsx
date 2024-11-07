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
    fotoPemesan: 'https://via.placeholder.com/150',
    jumlah: 'Rp. 150.000',
    statusPembayaran: 'Lunas',
    namaPelatih: 'John Doe',
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
    fotoPemesan: 'https://via.placeholder.com/150',
    statusPembayaran: 'Diproses',
    namaPelatih: 'Jane Doe',
    sesi: 'Sesi 2',
    namaMitra: 'Hotel Ratu',
  },
  {
    id: 3,
    kota: 'Jambi',
    alamat: 'Jln. Merpati, Bakung ujung',
    kota: 'Jambi',
    kelas: 'Zumba',
    namaPelatih: 'Rina Putri',
    tanggalPesanan: '26 Oktober 2024, 10:30',
    metodePembayaran: 'Transfer - Online',
    jumlah: 'Rp. 150.000',
    fotoPemesan: 'https://via.placeholder.com/150',
    statusPembayaran: 'Ditolak',
    namaPelatih: 'Mark Smith',
    sesi: 'Sesi 3',
    namaMitra: 'Hotel Putri',
  },
  // Anda bisa menambahkan lebih banyak data di sini
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
    <div className="items-center justify-center p-4 flex flex-col rounded-lg  ">
      <h3 className="text-green-600 font-bold text-2xl mb-4 text-center animate__animated animate__fadeIn">
        INFORMASI PESANAN
      </h3>
      <p className="text-gray-600 mb-6 text-center animate__animated animate__fadeIn animate__delay-1s">
        Nikmati kelas dan fasilitas yang telah Anda pilih!
      </p>
      <div className="w-full mx-auto items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {orderData.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border-2 items-center  flex gap-4 border-gray-200 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            {/* Foto Pemesan */}
            <div className="flex justify-center ">
              <img
                src={order.fotoPemesan}
                alt="Foto Pemesan"
                className="w-full h-max rounded-lg object-cover border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-end">
                <span
                  className={`px-3 py-1 rounded-lg text-white ${order.statusPembayaran === 'Lunas'
                    ? 'bg-green-500'
                    : order.statusPembayaran === 'Diproses'
                      ? 'bg-yellow-500'
                      : order.statusPembayaran === 'Ditolak'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                >
                  {order.statusPembayaran}
                </span>
              </div>

              <div className="animate__animated animate__fadeIn animate__delay-2s">
                <p className="text-gray-800">
                  <span className="font-semibold text-md">Nama Mitra:</span> {order.namaMitra}
                </p>
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-2s">
                <p className="text-gray-800">
                  <span className="font-semibold text-md">Kelas:</span> {order.kelas}
                </p>
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-2s">
                <p className="text-gray-800">
                  <span className="font-semibold text-md">Tanggal Pesanan:</span> {order.tanggalPesanan}
                </p>
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-2s">
                <p className="text-gray-800">
                  <span className="font-semibold text-md">Metode Pembayaran:</span> {order.metodePembayaran}
                </p>
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-2s">
                <p className="text-gray-800">
                  <span className="font-semibold text-md">Total:</span> {order.jumlah}
                </p>
              </div>

              <div className="mt-4 text-center flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg bg-blue-500 text-white"
                  onClick={() => openModal(order)}
                >
                  <span>Detail Pesanan</span>
                </button>
              </div>
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
