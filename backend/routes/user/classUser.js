const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserMemberships } = require('../../controllers/user/kelasController')

// Mitra
router.get('/class', upload.none(), authenticateJWT, getUserMemberships);



module.exports = router;