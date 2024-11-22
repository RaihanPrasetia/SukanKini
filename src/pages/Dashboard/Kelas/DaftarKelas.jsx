import React, { useState } from "react";
import bankMitraService from "../../../service/User/bankService";
import classService from "../../../service/User/classService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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

  // Handle file upload
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

      // Show success message with response message
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48">
          <img
            src={`/images/kelas/${classInfo.imagePath || "default-class.jpg"}`}
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
            onClick={handlePaymentClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold text-center mb-4">Pilih Bank</h2>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ease-in-out"
              value={selectedBank}
              onChange={(e) => handleBankSelection(e.target.value)}
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
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="bukti-pembayaran"
              >
                Upload Bukti Pembayaran
              </label>
              <input
                id="bukti-pembayaran"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
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
