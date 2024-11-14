import React from 'react';

const DetailPembayaran = ({ order, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 space-y-6 shadow-xl transform transition-all animate__animated animate__zoomIn">
                
                <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">{`Detail Pesanan`}</h3>

                <div className="flex justify-center w-full mb-4">
                    <img
                        src={order.fotoPemesan}
                        alt="Foto Pemesan"
                        className="w-full h-52 rounded-lg object-cover border-4 border-gray-200 shadow-md"
                    />
                </div>

                <div className="flex justify-center mb-4">
                    <span
                        className={`px-4 py-2 text-center font-semibold rounded-lg text-white ${order.statusPembayaran === 'Lunas'
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

                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">{order.namaMitra}</h1>
                    <p className="text-lg text-gray-600">{order.kota}, {order.alamat}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-md font-medium text-gray-800"><strong>Nama Kelas:</strong> {order.kelas}</p>
                    <p className="text-md font-medium text-gray-800"><strong>Nama Pelatih:</strong> {order.namaPelatih}</p>
                    <p className="text-md font-medium text-gray-800"><strong>Sesi:</strong> {order.sesi}</p>
                    <p className="text-md font-medium text-gray-800"><strong>Tanggal Pesanan:</strong> {order.tanggalPesanan}</p>
                    <p className="text-md font-medium text-gray-800"><strong>Metode Pembayaran:</strong> {order.metodePembayaran}</p>
                </div>

                <div className="text-center mt-4">
                    <strong className="text-2xl text-gray-800">{order.jumlah}</strong>
                </div>

                <div className="mt-6 text-center">
                    <button
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-700 transition duration-300"
                        onClick={closeModal}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailPembayaran;
