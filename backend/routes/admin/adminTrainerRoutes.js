const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');

const { getAdminTrainers } = require('../../controllers/admin/trainerControllers');

router.get('/trainers', authenticateJWT, getAdminTrainers);

module.exports = router;