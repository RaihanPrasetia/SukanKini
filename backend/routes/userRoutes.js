const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../middleware/jwtMiddleware');
const validateApiKey = require('../helpers/apiKeyHelper')

const { deleteUser, updateUser, profil } = require('../controllers/userController');


router.post('/delete/:id', authenticateJWT, deleteUser);
router.post('/update/:id', upload.none(), authenticateJWT, updateUser);
router.get('/profil', authenticateJWT, profil, validateApiKey);

module.exports = router; 