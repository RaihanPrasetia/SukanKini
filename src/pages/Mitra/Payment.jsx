import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import bankService from "../../service/bankService";
import paymentService from "../../service/paymentService"; // Import service
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function HomeMitra() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  // State untuk informasi bank
  const [payments, setPayments] = useState([]);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Get userName and user from useAuth
  const handleLogout = () => {
    handleMenuClick();
    logout();
    navigate("/");
  };
  const handleMenuClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);
  const promos = [
    { id: 1, name: "Promo A", price: 100000 },
    { id: 2, name: "Promo B", price: 150000 },
    { id: 3, name: "Promo C", price: 200000 },
  ];

  // Fungsi untuk memeriksa status pembayaran pertama
  const isFirstPaymentPending =
    payments.length > 0 && payments[0].paymentStatus === "Diproses";
  const isFirstPaymentApproved =
    payments.length > 0 && payments[0].paymentStatus === "Diterima";

  useEffect(() => {
    // Fetch informasi bank
    const fetchBankInfo = async () => {
      try {
        const bankData = await bankService.getBankById(1); // Ganti dengan ID bank yang relevan
        setBankInfo({
          id: bankData.id,
          bankName: bankData.brand,
          accountNumber: bankData.no_rek,
          accountHolder: bankData.an,
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const fetchPayments = async () => {
      try {
        const paymentData = await paymentService.getPaymentStatus();
        setPayments(paymentData);
      } catch (error) {
        Swal.fire({
          title: "Cek Status Pembayaran Anda",
          text: "Segera cek status pembayaran Anda untuk memastikan proses berjalan lancar. Pastikan semuanya sudah terverifikasi!",
          icon: "info",
          confirmButtonText: "Cek Sekarang",
          confirmButtonColor: "#ff9900", // Warna tombol konfirmasi oranye
          background: "#f0f8ff", // Latar belakang yang lebih lembut
          color: "#333", // Warna teks gelap
          iconColor: "#ff9900", // Warna ikon informasi oranye
          padding: "20px", // Menambah padding agar popup lebih luas
          customClass: {
            popup: "swal-popup-custom", // Kelas custom untuk popup
            title: "swal-title-custom", // Kelas custom untuk judul
            icon: "swal-icon-custom", // Kelas custom untuk ikon
            confirmButton: "swal-btn-custom", // Kelas custom untuk tombol
          },
        });
      }
    };

    fetchBankInfo();
    fetchPayments();
  }, []);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handlePromoChange = (promo) => {
    setSelectedPromo(promo);
  };

  const handleFileUpload = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const handlePaymentSubmit = async () => {
    // Validasi jika promo atau bukti pembayaran belum dipilih
    if (!selectedPromo || !paymentProof) {
      Swal.fire({
        title: "Perhatian",
        text: "Silakan pilih promo dan unggah bukti pembayaran.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await paymentService.createPayment({
        bankId: bankInfo.id,
        total: selectedPromo.price,
        paymentProof,
      });

      if (response && response.message) {
        Swal.fire({
          title: "Sukses",
          text: `Pembayaran berhasil untuk promo ${selectedPromo.name}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setIsPaymentCompleted(true);

        const updatedPayments = await paymentService.getPaymentStatus();
        setPayments(updatedPayments);

        closePaymentModal(); // Menutup modal pembayaran
      } else {
        // Jika respons tidak sesuai dengan format yang diharapkan
        Swal.fire({
          title: "Error",
          text: "Pembayaran gagal. Coba lagi nanti.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Menangani error saat request API gagal
      console.error("Error during payment submission:", error);

      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "Terjadi kesalahan saat memproses pembayaran. Coba lagi nanti.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <nav className="flex  items-center justify-end px-16 w-full bg-green-500 text-white py-4 shadow-md transition-all duration-300 ">
        {/* Profile and Logout Section */}
        <div
          className="relative flex items-center profile-dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex items-center text-lg hover:text-green-600 transition duration-300 space-x-2 cursor-pointer">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Default Profile"
                className="h-12 w-12 rounded-full"
              />
            )}
          </div>

          {/* Dropdown Menu for Profile and Logout */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[60px] mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-300 transition duration-200 rounded-md"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="flex flex-col bg-gray-100 items-center justify-center px-4 sm:p-16 py-24 lg:pt-32 transition-all duration-300 ">
        {isFirstPaymentApproved ? (
          <div className="flex flex-col w-full justify-center items-center bg-blue-500 rounded-lg shadow-lg p-6 mb-4">
            <h1 className="text-lg md:text-xl  font-semibold text-white mb-2 text-center leading-snug">
              Pembayaran Anda telah diterima.
            </h1>
            <div className="flex justify-center items-center">
              <Link
                onClick={handleMenuClick}
                to="/mitra/home"
                className="block px-4 py-2 text-gray-900 bg-white hover:bg-green-300 transition duration-200 rounded-md"
              >
                <FaUser className="inline mr-2" />
                Ke Halaman Dashboard
              </Link>
            </div>
          </div>
        ) : isFirstPaymentPending ? (
          <div className="flex flex-col w-full bg-yellow-500 rounded-lg shadow-lg p-6 mb-4">
            <h1 className="text-lg md:text-xl font-semibold text-white text-left leading-snug">
              Pembayaran Anda sedang ditinjau oleh admin. Silakan menunggu
              konfirmasi lebih lanjut.
            </h1>
          </div>
        ) : (
          !isPaymentCompleted &&
          !isFirstPaymentPending &&
          !isFirstPaymentApproved && (
            <div className="flex flex-col w-full bg-red-500 rounded-lg shadow-lg p-6 mb-4">
              <h1 className="text-lg md:text-xl font-semibold text-white text-left leading-snug">
                Silahkan untuk melanjutkan pembayaran terlebih dahulu
              </h1>
            </div>
          )
        )}

        {!isFirstPaymentPending && !isFirstPaymentApproved && (
          <div className="w-full sm:w-3/4 lg:w-2/3 mx-auto p-6 rounded-lg bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Promo
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className={`cursor-pointer p-5 rounded-lg shadow-md border-2 transition-all duration-300
                                       ${
                                         selectedPromo?.id === promo.id
                                           ? "border-green-500 bg-green-100"
                                           : "border-gray-300 bg-gray-100"
                                       }`}
                  onClick={() => handlePromoChange(promo)}
                  style={{ minWidth: "150px" }}
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {promo.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Harga:{" "}
                    <span className="font-semibold">Rp. {promo.price}</span>
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={openPaymentModal}
              className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-green-600 transition duration-300 block mx-auto"
            >
              Lanjutkan Pembayaran
            </button>
          </div>
        )}

        {/* Tabel Data Pembayaran */}
        <div className="mt-6 w-full bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Riwayat Pembayaran
          </h2>
          <table className="w-full table-auto border-separate text-center border-spacing-0.5 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-yellow-500 text-white">
                <th className="px-6 py-3 text-sm font-medium ">No</th>
                <th className="px-6 py-3 text-sm font-medium ">Bukti</th>
                <th className="px-6 py-3 text-sm font-medium ">Bank Tujuan</th>
                <th className="px-6 py-3 text-sm font-medium ">
                  Nomor Rekening
                </th>
                <th className="px-6 py-3 text-sm font-medium ">Atas Nama</th>
                <th className="px-6 py-3 text-sm font-medium ">Total</th>
                <th className="px-6 py-3 text-sm font-medium ">
                  Status Pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className="transition duration-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">
                    {payment.paymentProof ? (
                      <img
                        src={`/bukti/${payment.paymentProof}`}
                        alt={`Bukti Pembayaran ${payment.id}`}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                      />
                    ) : (
                      <span className="text-red-500 font-medium">No Proof</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {" "}
                    {payment.bank.bankBrand}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {" "}
                    {payment.bank.accountNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {" "}
                    {payment.bank.accountName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-bold">
                    Rp. {payment.total}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`
                                            ${
                                              payment.paymentStatus ===
                                              "Diterima"
                                                ? "px-4 py-2 bg-green-500 text-white rounded-lg"
                                                : payment.paymentStatus ===
                                                  "Ditolak"
                                                ? "px-4 py-2 bg-red-500 text-white rounded-lg"
                                                : payment.paymentStatus ===
                                                  "Diproses"
                                                ? "px-4 py-2 bg-yellow-500 text-white rounded-lg"
                                                : "text-gray-500"
                                            } font-semibold`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isPaymentModalOpen && bankInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg transform transition-transform scale-100">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Pembayaran
              </h2>
              <p className="text-base text-gray-600 mb-4 leading-relaxed text-center">
                  Silakan transfer pembayaran sesuai dengan informasi rekening di bawah ini, lalu unggah bukti pembayaran Anda.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
                  {selectedPromo && (
                      <div className="mb-4">
                          <h3 className="text-gray-700 font-medium">Total Pembayaran:</h3>
                          <p className="text-xl font-bold text-gray-900">
                              Rp. {selectedPromo.price}
                          </p>
                      </div>
                  )}
      
                  <div className="mb-4">
                      <h3 className="text-gray-700 font-medium">Informasi Rekening:</h3>
                      <div className="mt-2 space-y-1">
                          <p><span className="font-semibold">Bank:</span> {bankInfo.bankName}</p>
                          <p><span className="font-semibold">No. Rekening:</span> {bankInfo.accountNumber}</p>
                          <p><span className="font-semibold">Atas Nama:</span> {bankInfo.accountHolder}</p>
                      </div>
                  </div>
      
                  <div>
                      <label htmlFor="fileUpload" className="block text-gray-700 font-medium mb-2">
                          Unggah Bukti Pembayaran
                      </label>
                      <input
                          type="file"
                          id="fileUpload"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                      />
                  </div>
              </div>
              <div className="flex justify-between gap-4">
                  <button
                      onClick={closePaymentModal}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition text-center"
                  >
                      Batal
                  </button>
                  <button
                      onClick={handlePaymentSubmit}
                      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition text-center"
                  >
                      Kirim Bukti Pembayaran
                  </button>
              </div>
          </div>
      </div>
      
        )}
      </div>
    </>
  );
}
