const express = require('express');
const router = express.Router();

// Import Auth Routes
const authRoutes = require('./authRoutes');

// import Mitra Routes
const classRoutes = require('./mitra/classRoutes');
const paymentMitra = require('./mitra/paymentMitra');
const bankMitra = require('./mitra/bankMitra');
const trainerMitra = require('./mitra/trainerMitra');
const categoryMitra = require('./mitra/categoryMitra');
const dashboard = require('./mitra/dashboard');

// import User Routes
const userRoutes = require('./userRoutes');
const classUser = require('./user/classUser');
const paymentUser = require('./user/paymentUser');
const getBankMitra = require('./user/bankMitra');

// import Send Otp Routes & notif
const sendOtp = require('./sendOtpRoutes');
const notifications = require('./notifikasiRoutes');

// import Admin
const adminPayment = require('./admin/adminPaymentRoutes');
const adminClass = require('./admin/adminClassRoutes');
const adminTrainer = require('./admin/adminTrainerRoutes');
const adminUser = require('./admin/adminUser');
const adminDashboard = require('./admin/adminDashboardCount');

router.use(authRoutes);

// Mitra Routes
router.use('/mitra', classRoutes);
router.use('/mitra', paymentMitra);
router.use('/mitra', bankMitra);
router.use('/mitra', trainerMitra);
router.use('/mitra', categoryMitra);
router.use('/mitra', dashboard)

// import multi data table users
router.use('/user', userRoutes);

// User Routes
router.use(classUser);
router.use(paymentUser);
router.use(getBankMitra);
router.use(sendOtp);
router.use(notifications);

// Admin Routes
router.use('/admin', adminPayment);
router.use('/admin', adminClass);
router.use('/admin', adminTrainer);
router.use('/admin', adminUser);
router.use('/admin', adminDashboard);


module.exports = router;
