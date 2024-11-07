// PaymentPopup.js
import React from 'react';
import Swal from 'sweetalert2';

const PaymentPopup = ({ onClose }) => {

  // Function to handle payment and show SweetAlert success
  const handlePayment = () => {
    Swal.fire({
      title: 'Pembayaran Diterima',
      text: 'Pembayaran Anda sudah diterima. Terima kasih!',
      icon: 'success',
      confirmButtonText: 'Tutup',
      customClass: {
        popup: 'rounded-lg', // Rounded corners for the popup
        title: 'font-bold text-green-700', // Custom title style
        confirmButton: 'bg-green-500 text-white hover:bg-green-600 font-medium',
      }
    }).then(() => {
      // Optionally perform any action after the payment process is done, e.g., closing modal
      onClose();
    });
  };

  // Function to trigger the SweetAlert modal with payment details
  const showPaymentDetails = () => {
    Swal.fire({
      title: 'Pilih Bank Tujuan',
      html: `
        <div class="text-center">
          <p class="text-lg font-semibold mb-4">Segera Selesaikan Pembayaran</p>
          <img src="/path-to-your-image.jpg" alt="Promo" class="w-3/4 mb-4 rounded-md" />
          <p class="text-lg font-semibold mb-2">BCA</p>
          <input type="text" value="123456835 A/N Ahmad Hussein" readonly class="swal2-input text-center mb-4 w-full max-w-[300px] mx-auto" />
          <input type="text" value="Rp. 150.000" readonly class="swal2-input text-center mb-6 w-full max-w-[300px] mx-auto" />
        </div>
      `,
      showConfirmButton: false, // Disable default confirm button
      showCancelButton: true, // Show the cancel button
      cancelButtonText: 'Tutup',
      customClass: {
        htmlContainer: 'swal2-html-container py-6 px-6',
        input: 'swal2-input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-center',
        cancelButton: 'bg-gray-500 text-white hover:bg-gray-600 font-medium py-2 px-4 rounded-md', // Customize the cancel button
      },
      didOpen: () => {
        // Adding event listener to custom button in SweetAlert modal
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
          'mx-auto', // Center horizontally
          'block' // Ensure it behaves as a block element for centering
        );
        
        // Attach click event to the custom button inside SweetAlert modal
        paymentButton.addEventListener('click', handlePayment);

        // Append the button to the SweetAlert modal content
        const swalContent = document.querySelector('.swal2-html-container');
        swalContent.appendChild(paymentButton);
      }
    });
  };

  return (
    <button
      onClick={showPaymentDetails}
      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition font-medium"
    >
      Bayar Sekarang
    </button>
  );
};

export default PaymentPopup;
