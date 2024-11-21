import React from "react";
import bankMitraService from '../../../service/User/bankService'

const DaftarKelasPopup = ({ onClose, classInfo }) => {
  if (!classInfo) return null;
  console.log(classInfo)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48">
          <img
            src={`/images/kelas/${classInfo.imagePath || "default-class.jpg"}`} // Use default-class.jpg if no image is provided
            alt={classInfo.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full shadow hover:text-red-600 transition-transform transform hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Class Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {classInfo.name}
          </h2>
          <h2 className="text-2xl font-semibold text-green-500 mb-4 text-center uppercase">
            {classInfo.owner.name}
          </h2>
          <p className="mb-3 text-gray-700">
            <strong>Pelatih:</strong> {classInfo.trainer.name}
          </p>
          <p className="mb-3 text-gray-700">
            <strong>Alamat:</strong> {classInfo.address}
          </p>
          <p className="mb-3 text-gray-700">
            <strong>Jadwal:</strong>{" "}
            {classInfo.schedules
              .map((schedule) => `${schedule.hari} ${schedule.jam}`)
              .join(", ")}
          </p>
          <p className="mb-3 text-gray-700">
            <strong>Harga:</strong> Rp {classInfo.price.toLocaleString()}
          </p>

        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Tutup
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaftarKelasPopup;
