const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserVideos } = require('../../controllers/user/videosController');

router.get('/videos', authenticateJWT, getUserVideos); // Create a new comment

module.exports = router;