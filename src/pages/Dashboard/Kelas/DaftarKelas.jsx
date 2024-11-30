import React, { useState } from "react";
import bankMitraService from "../../../service/User/bankService";
import classService from "../../../service/User/classService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

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
        icon: "error",
        title: "Gagal!",
        text: "Gagal mengambil daftar bank. Silakan coba lagi.",
      });
    }
  };

  // Function to handle bank selection and show details
  const handleBankSelection = (bankId) => {
    setSelectedBank(bankId);
    const selectedBankDetails = bankList.find(
      (bank) => bank.id === Number(bankId)
    );
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
        icon: "warning",
        title: "Peringatan",
        text: "Harap pilih bank dan unggah bukti pembayaran.",
      });
      return;
    }

    // Show confirmation before proceeding
    const confirmPayment = await Swal.fire({
      icon: "question",
      title: "Konfirmasi Pembayaran",
      text: "Apakah Anda yakin ingin melanjutkan pembayaran?",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    });

    if (!confirmPayment.isConfirmed) {
      return; // User canceled the payment
    }

    setIsSubmitting(true);

    try {
      const total = classInfo.price;
      const classId = classInfo.id; // Use class price as the total

      // Create the membership and handle response
      const response = await classService.createMemberships(
        classId,
        selectedBank,
        total,
        buktiPembayaran
      );

      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: response.message || "Silakan tunggu konfirmasi.",
        confirmButtonText: "Ya",
      }).then(() => {
        // After success, navigate to the profile or class page
        navigate(`/profile/pembayaran`);
      });
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: error.message || "Gagal melakukan pembayaran. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header Image */}
        <div className="relative h-48 flex items-center justify-center">
          <img
            src={`/images/kelas/${classInfo.imagePath || "default-class.jpg"}`}
            alt={classInfo.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-red-500  p-3 rounded-full shadow-lg hover:bg-white hover:text-red-600 hover:rotate-45 transition-all focus:outline-none"
          >
            <AiOutlineClose size={18} />
          </button>
          <h2 className="text-2xl absolute font-bold text-white  text-center uppercase">
            {classInfo.name}
          </h2>
          <div className="flex flex-col justify-start items-center absolute p-4 bottom-0 left-0">
            <h2 className="text-lg font-semibold text-white  text-center">
              {classInfo.owner.name}
            </h2>
          </div>
        </div>

        {/* Class Details */}
        <div className="p-4 ">
          {/* Class Details */}
          <div className=" text-gray-700">
            <p className="text-lg">
              <strong className="font-semibold">Pelatih:</strong>{" "}
              {classInfo.trainer.name}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Alamat:</strong>{" "}
              {classInfo.address}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Jadwal:</strong>{" "}
              {classInfo.schedules
                .map((schedule) => `${schedule.hari} ${schedule.jam}`)
                .join(", ")}
            </p>

            <div className="mb-2">
              <h5 className="font-semibold text-lg text-blue-500">
                Manfaat Kelas:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {classInfo.benefits.map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200"
                  >
                    <h6 className="font-semibold text-green-600">
                      {index + 1}. {benefit.name}
                    </h6>
                    <p className="text-gray-700 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-2xl text-center text-green-500 font-bold">
              <strong className=" text-gray-600">Harga:</strong> Rp{" "}
              {classInfo.price.toLocaleString()}
            </p>
          </div>

          <hr className="mb-6 mt-2 border-t border-gray-300" />

          {/* Actions */}
          <div className="flex justify-center">
            <button
              onClick={handlePaymentClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
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
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      alert("Ukuran file tidak boleh lebih dari 5MB");
                      e.target.value = ""; // Reset input jika file terlalu besar
                    } else {
                      handleFileChange(e); // Panggil fungsi untuk memproses file
                    }
                  }
                }}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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
