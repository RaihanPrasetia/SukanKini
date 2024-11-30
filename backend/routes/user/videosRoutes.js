const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getUserVideos, incrementViewCount } = require('../../controllers/user/videosController.js');


router.get('/videos', authenticateJWT, getUserVideos); // Create a new comment
router.put('/videos/:videoId/view', incrementViewCount);

module.exports = router;