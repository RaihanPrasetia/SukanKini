import React from 'react';

const DetailPembayaran = ({ order, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3 space-y-2">

                <h3 className="text-xl font-bold text-center mb-4 text-[26px]">Detail Pesanan</h3>
                <div className="flex justify-center w-full mb-4">
                    <img
                        src={order.fotoPemesan}
                        alt="Foto Pemesan"
                        className="w-full h-52 rounded-lg object-cover border-2 border-gray-300"
                    />
                </div>
                <div className="flex gap-4 items-center justify-between">
                    <span
                        className={`px-4 w-1/2 text-center font-semibold py-1 rounded-lg text-white ${order.statusPembayaran === 'Lunas'
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

                <div className='text-center'>
                    <h1 className='text-[24px] font-semibold'>{order.namaMitra}</h1>
                    <p className='text-md'><span>{order.kota}, </span>{order.alamat}</p>
                </div>
                <p className="mb-2">
                    <strong>Nama Kelas:</strong> {order.kelas}
                </p>
                <p className="mb-2">
                    <strong>Nama Pelatih:</strong> {order.namaPelatih}
                </p>
                <p className="mb-2">
                    <strong>Sesi:</strong> {order.sesi}
                </p>

                <p className="mb-2">
                    <strong>Tanggal Pesanan:</strong> {order.tanggalPesanan}
                </p>
                <p className="mb-2">
                    <strong>Metode Pembayaran:</strong> {order.metodePembayaran}
                </p>
                <div className='text-center'>
                    <strong className='text-[20px] text-end'>
                        {order.jumlah}
                    </strong>
                </div>


                <div className="mt-4 text-center">
                    <button
                        className="px-8 py-2 bg-gray-600 text-white rounded-lg"
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
