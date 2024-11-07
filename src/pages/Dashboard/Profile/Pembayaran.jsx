import React from 'react';

const Pembayaran = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 p-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
          <h3 className="text-green-600 font-bold text-2xl mb-4 text-center animate__animated animate__fadeIn">
            INFORMASI PESANAN
          </h3>
          <p className="text-gray-600 mb-6 text-center animate__animated animate__fadeIn animate__delay-1s">
            Nikmati kelas dan fasilitas yang telah Anda pilih!
          </p>
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <div className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
              <p className="text-gray-800">
                <span className="font-semibold text-lg">Nama Pemesan:</span> Baihaqi Khaizan
              </p>
            </div>
            <div className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
              <p className="text-gray-800">
                <span className="font-semibold text-lg">Tanggal Pesanan:</span> 25 Oktober 2024, 11:49
              </p>
            </div>
            <div className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
              <p className="text-gray-800">
                <span className="font-semibold text-lg">Kode Tiket:</span> ALBY29XK
              </p>
            </div>
            <div className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
              <p className="text-gray-800">
                <span className="font-semibold text-lg">Metode Pembayaran:</span> Transfer - Online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
