const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getBankMitra } = require('../../controllers/user/bankController')

// Mitra
router.get('/bank/mitra/:userId', upload.none(), authenticateJWT, getBankMitra);


module.exports = router;