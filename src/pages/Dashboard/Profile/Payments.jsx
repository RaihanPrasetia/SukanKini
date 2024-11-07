// src/pages/Payments.js

import React, { useState } from 'react';

function Payments() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing (you can add API calls here)
    console.log('Processing payment...', { amount, paymentMethod });

    // Set the payment status
    setPaymentStatus('Payment processed successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Pembayaran</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="w-full p-2 border rounded-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="w-full p-2 border rounded-lg"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Submit Payment
        </button>
      </form>

      {paymentStatus && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-lg shadow-md">
          {paymentStatus}
        </div>
      )}
    </div>
  );
}

export default Payments;
