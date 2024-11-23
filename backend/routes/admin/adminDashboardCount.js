const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middleware/jwtMiddleware');


const { getCountsAdmin } = require('../../controllers/admin/dashboardAdmin');

router.get('/dashboard/count', authenticateJWT, getCountsAdmin);

module.exports = router;