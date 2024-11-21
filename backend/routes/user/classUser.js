const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserMemberships, createMembership, getClassNow, getAllClass, getClassById } = require('../../controllers/user/kelasController')

// Mitra
router.get('/class', upload.none(), authenticateJWT, getUserMemberships);
router.get('/class/:id', upload.none(), authenticateJWT, getClassById);
router.get('/class/now', upload.none(), authenticateJWT, getClassNow);
router.post('/class/daftar', upload.none(), authenticateJWT, createMembership);
router.get('/all/class', upload.none(), authenticateJWT, getAllClass);



module.exports = router;