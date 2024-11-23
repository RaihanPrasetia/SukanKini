const express = require('express')
const router = express.Router();

const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserPayments, createPayment, upload } = require('../../controllers/user/paymentController')

router.get('/payments', upload.none(), authenticateJWT, getUserPayments);
router.post('/payments/create', upload.single('bukti'), authenticateJWT, createPayment);

module.exports = router;