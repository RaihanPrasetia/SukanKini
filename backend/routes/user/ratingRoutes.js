const express = require('express')
const router = express.Router();

const authenticateJWT = require('../../middleware/jwtMiddleware');
const { createRating } = require('../../controllers/user/ratingController')


router.post('/rating/create', authenticateJWT, createRating);

module.exports = router;