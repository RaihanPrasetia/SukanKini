const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../middleware/jwtMiddleware');

const { getNotifications, updateNotificationReadStatus } = require('../controllers/notifController');

router.get('/notifications', upload.none(), authenticateJWT, getNotifications);
router.put('/notifications/:id/read', upload.none(), authenticateJWT, updateNotificationReadStatus);

module.exports = router; 