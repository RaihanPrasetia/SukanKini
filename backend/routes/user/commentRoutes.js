const express = require('express');
const multer = require('multer');
const { createComment, getComments } = require('../../controllers/user/commentController');
const router = express.Router();
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');


router.post('/comments', authenticateJWT, createComment); // Create a new comment
router.get('/comments/:video_id', authenticateJWT, upload.none(), getComments); // Get comments for a specific video

module.exports = router;
