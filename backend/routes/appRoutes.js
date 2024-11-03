const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Menggunakan cors secara global untuk semua rute

router.use(authRoutes);
router.use('/user', userRoutes);

module.exports = router;
