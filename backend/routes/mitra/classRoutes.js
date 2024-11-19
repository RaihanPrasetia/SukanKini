const express = require('express')
const router = express.Router();
const upload = require('../../middleware/multerMiddleware')
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserClasses, getClassById, createClass, updateClass, deleteClass } = require('../../controllers/mitra/kelasController')

// Mitra
router.get('/class', upload.none(), authenticateJWT, getUserClasses);
router.get('/class/detail/:id', upload.none(), authenticateJWT, getClassById);
router.post('/class/create', upload.single('image_path'), authenticateJWT, createClass);
router.put('/class/update/:id', upload.single('image_path'), authenticateJWT, updateClass);
router.post('/class/delete/:id', upload.none(), authenticateJWT, deleteClass);



module.exports = router;