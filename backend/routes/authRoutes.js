const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { register, login, cekemail, registerMitra, cekEmailReady, resetPassword } = require('../controllers/authController');

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/check-email', upload.none(), cekemail);
router.post('/check-email/ready', upload.none(), cekEmailReady);
router.post('/register-mitra', upload.none(), registerMitra);
router.post('/reset-password', upload.none(), resetPassword);

module.exports = router;