const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserPayments, createPayment, updatePaymentStatus, getStatusPayments, getPaymentById, upload } = require('../../controllers/mitra/paymentController');

router.get('/payments', authenticateJWT, getUserPayments);
router.get('/payments/status', authenticateJWT, getStatusPayments);
router.get('/payments/:id', authenticateJWT, getPaymentById);
router.post('/payments/create', upload.single('bukti'), authenticateJWT, createPayment);
router.put('/payments/update/:id', upload.none(), authenticateJWT, updatePaymentStatus);
module.exports = router;