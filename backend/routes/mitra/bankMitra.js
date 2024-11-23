const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();
const { createBank, getUserBanks, updateBank, deleteBank, getBankById } = require('../../controllers/mitra/bankController'); // Controller yang sudah dibuat

// Routes
router.post('/banks/create', upload.none(), authenticateJWT, createBank);
router.get('/bank', authenticateJWT, getUserBanks);
router.get('/banks/:id', authenticateJWT, getBankById);
router.put('/banks/update/:id', upload.none(), authenticateJWT, updateBank);
router.delete('/banks/delete/:id', upload.none(), authenticateJWT, deleteBank);

module.exports = router;
