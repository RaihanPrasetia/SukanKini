const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserMemberships, createMembership, getAllClass, getClassById, getClassNow } = require('../../controllers/user/kelasController')

// Mitra
router.get('/class', upload.none(), authenticateJWT, getUserMemberships);
router.get('/class/now', upload.none(), authenticateJWT, getClassNow);
router.get('/all/class', upload.none(), authenticateJWT, getAllClass);
router.get('/class/detail/:id', upload.none(), authenticateJWT, getClassById);
router.post('/class/daftar', upload.none(), authenticateJWT, createMembership);



module.exports = router;