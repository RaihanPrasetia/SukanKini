import React, { useState } from "react";
import bankMitraService from "../../../service/User/bankService";
import classService from "../../../service/User/classService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const DaftarKelasPopup = ({ onClose, classInfo }) => {
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [bankList, setBankList] = useState([]);
const [selectedBank, setSelectedBank] = useState("");
const [bankDetails, setBankDetails] = useState(null);
const [buktiPembayaran, setBuktiPembayaran] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const navigate = useNavigate(); // Hook to navigate

if (!classInfo) return null;

// Function to fetch bank list and show modal
const handlePaymentClick = async () => {
const userId = classInfo.createdBy;
try {
const banks = await bankMitraService.getBankMitraById(userId);
setBankList(banks);
setShowPaymentModal(true);
} catch (error) {
console.error("Failed to fetch bank list:", error);
Swal.fire({
icon: 'error',
title: 'Gagal!',
text: 'Gagal mengambil daftar bank. Silakan coba lagi.',
});
}
};

// Function to handle bank selection and show details
const handleBankSelection = (bankId) => {
setSelectedBank(bankId);
const selectedBankDetails = bankList.find((bank) => bank.id === Number(bankId));
setBankDetails(selectedBankDetails);
};
const handleFileChange = (event) => {
setBuktiPembayaran(event.target.files[0]);
};

// Handle form submission
const handleSubmit = async (event) => {
// Prevent default form submission (if any)
event.preventDefault();

if (!selectedBank || !buktiPembayaran) {
Swal.fire({
icon: 'warning',
title: 'Peringatan',
text: 'Harap pilih bank dan unggah bukti pembayaran.',
});
return;
}

// Show confirmation before proceeding
const confirmPayment = await Swal.fire({
icon: 'question',
title: 'Konfirmasi Pembayaran',
text: 'Apakah Anda yakin ingin melanjutkan pembayaran?',
showCancelButton: true,
confirmButtonText: 'Ya, lanjutkan',
cancelButtonText: 'Batal',
});

if (!confirmPayment.isConfirmed) {
return; // User canceled the payment
}

setIsSubmitting(true);

try {
const total = classInfo.price;
const classId = classInfo.id; // Use class price as the total

// Create the membership and handle response
const response = await classService.createMemberships(classId, selectedBank, total, buktiPembayaran);

Swal.fire({
icon: 'success',
title: 'Pendaftaran Berhasil!',
text: response.message || 'Silakan tunggu konfirmasi.',
}).then(() => {
// After success, navigate to the profile or class page
navigate(`/profile/pembayaran`);
});
} catch (error) {
console.error("Error during submission:", error);
Swal.fire({
icon: 'error',
title: 'Gagal!',
text: error.message || 'Gagal melakukan pembayaran. Silakan coba lagi.',
});
} finally {
setIsSubmitting(false);
}
};



return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
  <div
    className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100">
    {/* Header Image */}
    <div className="relative h-48">
      <img src={`/images/kelas/${classInfo.imagePath || "default-class.jpg" }`} alt={classInfo.name}
        className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <button onClick={onClose}
        className="absolute top-4 right-4 text-white bg-red-600 p-3 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all focus:outline-none">
        <AiOutlineClose size={18} />
      </button>
    </div>

    {/* Class Details */}
    <div className="p-6">
      {/* Class Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {classInfo.name}
      </h2>

      {/* Owner Name */}
      <h2 className="text-xl font-semibold text-green-600 mb-6 text-center uppercase">
        {classInfo.owner.name}
      </h2>

      {/* Class Details */}
      <div className="space-y-3 text-gray-700">
        <p>
          <strong className="font-medium">Pelatih:</strong> {classInfo.trainer.name}
        </p>
        <p>
          <strong className="font-medium">Alamat:</strong> {classInfo.address}
        </p>
        <p>
          <strong className="font-medium">Jadwal:</strong>{" "}
          {classInfo.schedules
          .map((schedule) => `${schedule.hari} ${schedule.jam}`)
          .join(", ")}
        </p>
        <p>
          <strong className="font-medium">Harga:</strong> Rp{" "}
          {classInfo.price.toLocaleString()}
        </p>
      </div>
      <hr className="my-6 border-t border-gray-300" />

      {/* Actions */}
      <div className="px-6 pb-6 flex justify-center">
        <button onClick={handlePaymentClick}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  </div>

  {/* Payment Modal */}
  {showPaymentModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
    <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-slide-up">
      <h2 className="text-xl font-bold text-center mb-4">Pilih Bank</h2>
      <select
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ease-in-out"
        value={selectedBank} onChange={(e)=> handleBankSelection(e.target.value)}
        >
        <option value="" disabled className="text-gray-400">
          -- Pilih Bank --
        </option>
        {bankList.map((bank) => (
        <option key={bank.id} value={bank.id}>
          {bank.brand}
        </option>
        ))}
      </select>

      {/* Bank Details */}
      {bankDetails && (
      <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-lg shadow-md">
        <p className="text-sm text-gray-700">
          <strong>Nomor Rekening:</strong> {bankDetails.no_rek}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Atas Nama:</strong> {bankDetails.an}
        </p>
      </div>
      )}

      {/* File Upload */}
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="bukti-pembayaran">
          Upload Bukti Pembayaran
        </label>
        <input id="bukti-pembayaran" type="file" accept="image/*"
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          onChange={handleFileChange} />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={()=> setShowPaymentModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
          >
          Batal
        </button>
        <button onClick={handleSubmit} disabled={isSubmitting} className={`bg-gradient-to-r from-green-400 to-green-600
          text-white px-4 py-2 rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition-all transform
          hover:scale-105 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "" }`}>
          {isSubmitting ? "Mengirim..." : "Konfirmasi"}
        </button>
      </div>
    </div>
  </div>
  )}
</div>

);
};

export default DaftarKelasPopup;