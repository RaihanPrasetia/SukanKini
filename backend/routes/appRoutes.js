const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const classRoutes = require('./mitra/classRoutes');
const paymentMitra = require('./mitra/paymentMitra');
const bankMitra = require('./mitra/bankMitra');
const trainerMitra = require('./mitra/trainerMitra');

const router = express.Router();

// Menggunakan cors secara global untuk semua rute

router.use(authRoutes);
router.use('/user', userRoutes);
router.use('/mitra', classRoutes);
router.use('/mitra', paymentMitra);
router.use('/mitra', bankMitra);
router.use('/mitra', trainerMitra);

module.exports = router;
