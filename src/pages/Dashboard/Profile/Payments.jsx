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
    <div className="lg:p-8 p-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-green-600 mb-6">Pembayaran</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Submit Payment
        </button>
      </form>

      {paymentStatus && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
          {paymentStatus}
        </div>
      )}
    </div>
  );
}

export default Payments;
