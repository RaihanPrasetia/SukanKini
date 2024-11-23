const express = require('express')
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware');

const { deleteUser, updateUser, profil, upload } = require('../controllers/userController');


router.post('/delete/:id', authenticateJWT, deleteUser);
router.put('/update/:id', upload.single('image_path'), authenticateJWT, updateUser);
router.get('/profil', authenticateJWT, profil);

module.exports = router; 