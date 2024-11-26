import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentPopup = ({ onClose, totalHarga, bankTujuan, namaPemilik, nomorRek }) => {
  const navigate = useNavigate();

  // Function to handle payment and show SweetAlert success
  const handlePayment = () => {
    Swal.fire({
      title: 'Pembayaran Diterima',
      text: 'Pembayaran Anda sudah diterima. Terima kasih!',
      icon: 'success',
      confirmButtonText: 'Tutup',
      customClass: {
        popup: 'rounded-lg shadow-lg bg-gradient-to-r from-green-300 to-blue-500',
        title: 'font-bold text-green-800 text-xl',
        confirmButton: 'bg-green-600 text-white hover:bg-green-700 font-medium py-2 px-4 rounded-lg',
      }
    }).then(() => {
      handleMenuClick();
      // Navigate to profile/payment after closing the modal
      navigate('/profile/pembayaran');
    });
  };

  // Function to trigger the SweetAlert modal with payment details
  const showPaymentDetails = () => {
    Swal.fire({
      title: 'Pilih Bank Tujuan',
      html: `
        <div class="text-center">
          <p class="text-xl font-semibold mb-4 text-gray-700">Segera Selesaikan Pembayaran</p>
          <p class="text-lg font-semibold text-blue-600 mb-2">${bankTujuan}</p>
          <p class="text-lg font-semibold mb-2">No. Rekening: ${nomorRek}</p>
          <div class="flex items-center justify-center space-x-2 mb-4">
            <span class="font-semibold">A/N:</span>
            <span class="font-medium text-blue-800">${namaPemilik}</span>
          </div>
          <p class="text-lg font-semibold text-green-700 mb-2">Total Pembayaran: Rp. ${totalHarga}</p>
          <p class="text-sm text-gray-600">Pastikan Anda mentransfer sesuai informasi di atas.</p>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Batal',
      customClass: {
        htmlContainer: 'swal2-html-container py-6 px-6 bg-white rounded-lg shadow-xl',
        input: 'swal2-input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-center',
        cancelButton: 'bg-red-500 text-white hover:bg-red-600 font-medium py-2 px-4 rounded-md',
      },
      didOpen: () => {
        const paymentButton = document.createElement('button');
        paymentButton.textContent = 'Bayar Sekarang';
        paymentButton.classList.add(
          'bg-green-500',
          'text-white',
          'py-2',
          'px-4',
          'rounded-md',
          'hover:bg-green-600',
          'transition',
          'font-medium',
          'mt-4',
          'mx-auto',
          'block'
        );

        paymentButton.addEventListener('click', handlePayment);

        const swalContent = document.querySelector('.swal2-html-container');
        swalContent.appendChild(paymentButton);
      }
    });
  };

  const handleMenuClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={showPaymentDetails}
      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-white hover:text-green-500 transition-all font-medium shadow-lg"
    >
      Lanjut Ke Pembayaran
    </button>
  );
};

export default PaymentPopup;
