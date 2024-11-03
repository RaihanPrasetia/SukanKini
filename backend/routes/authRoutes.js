const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { register, login } = require('../controllers/authController');

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);


module.exports = router;
