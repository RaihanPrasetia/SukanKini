const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();

const { getAdminAllClass, getAdminClassById } = require('../../controllers/admin/classController');

router.get('/class', authenticateJWT, getAdminAllClass);
router.get('/class/:id', upload.none(), authenticateJWT, getAdminClassById);

module.exports = router;