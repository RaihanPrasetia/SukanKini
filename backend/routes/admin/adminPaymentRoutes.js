const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();

const { getAdminPayments, getPaymentById, updatePaymentStatus } = require('../../controllers/admin/paymentControllers');

router.get('/payments/mitra', authenticateJWT, getAdminPayments);
router.get('/payments/mitra/:id', upload.none(), authenticateJWT, getPaymentById);
router.put('/payments/mitra/update/:id', upload.none(), authenticateJWT, updatePaymentStatus);

module.exports = router;