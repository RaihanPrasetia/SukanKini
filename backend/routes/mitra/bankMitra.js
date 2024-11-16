const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();
const { createBank, getUserBanks, updateBank, deleteBank } = require('../../controllers/mitra/bankController'); // Controller yang sudah dibuat

// Routes
router.post('/banks/create', upload.none(), authenticateJWT, createBank);  // Membuat bank baru
router.get('/banks', authenticateJWT, getUserBanks);  // Mendapatkan semua bank milik user
router.put('/banks/update/:id', upload.none(), authenticateJWT, updateBank);  // Mengupdate bank
router.delete('/banks/delete/:id', upload.none(), authenticateJWT, deleteBank);  // Menghapus bank

module.exports = router;
