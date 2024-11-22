const express = require('express')
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();

const { getCounts } = require('../../controllers/mitra/dashboardController')

// Mitra
router.get('/jumlah', upload.none(), authenticateJWT, getCounts);



module.exports = router;