const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { sendOtp } = require('../controllers/sendOtpController');

router.post('/send-otp', upload.none(), sendOtp);

module.exports = router;