const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const multer = require('multer');
const upload = multer();

const { getUserByRole } = require('../../controllers/admin/userController');

router.get('/user/:role', upload.none(), authenticateJWT, getUserByRole);

module.exports = router;