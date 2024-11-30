const express = require('express');
const { upload, createVideo, getVideos, updateVideo, deleteVideo } = require('../../controllers/admin/videoController');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');


router.post('/videos', authenticateJWT, upload.none(), createVideo); // Upload video
router.get('/videos', authenticateJWT, getVideos); // Get all videos
router.put('/videos/:id', authenticateJWT, upload.none(), updateVideo); // Update video
router.delete('/videos/:id', authenticateJWT, upload.none(), deleteVideo); // Delete video

module.exports = router;
