const express = require('express')
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getTrainers, createTrainer, updateTrainer, deleteTrainer, upload } = require('../../controllers/mitra/trainerController')

// Mitra
router.get('/trainers', upload.none(), authenticateJWT, getTrainers);
router.post('/trainers/create', upload.single('image_path'), authenticateJWT, createTrainer);
router.put('/trainers/update/:id', upload.single('image_path'), authenticateJWT, updateTrainer);
router.post('/trainers/delete/:id', upload.none(), authenticateJWT, deleteTrainer);



module.exports = router;