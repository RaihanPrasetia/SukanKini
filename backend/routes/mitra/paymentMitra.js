const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserPayments, createPayment, updatePaymentStatus, getStatusPayments, upload } = require('../../controllers/mitra/paymentController');

// Routes untuk mengambil pembayaran milik user yang sedang login
router.get('/payments', authenticateJWT, getUserPayments);  // Menggunakan middleware untuk memastikan user sudah login
router.get('/payments/status', authenticateJWT, getStatusPayments);  // Menggunakan middleware untuk memastikan user sudah login
router.post('/payments/create', upload.single('bukti'), authenticateJWT, createPayment);
router.put('/payments/update/:id', upload.none(), authenticateJWT, updatePaymentStatus);  // Menggunakan middleware untuk memastikan user sudah login

module.exports = router;