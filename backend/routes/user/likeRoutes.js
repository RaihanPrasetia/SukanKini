const express = require('express');
const multer = require('multer');
const { likeVideo, getLikes } = require('../../controllers/user/likeController');
const router = express.Router();
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');


router.post('/likes', upload.none(), authenticateJWT, likeVideo); // Create a new comment
router.get('/likes/:video_id', authenticateJWT, upload.none(), getLikes); // Get comments for a specific video

module.exports = router;
