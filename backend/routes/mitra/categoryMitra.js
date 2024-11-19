const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authenticateJWT = require('../../middleware/jwtMiddleware');
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../../controllers/mitra/categoryController');

// Create a new category
router.post('/categories/create', upload.none(), authenticateJWT, createCategory);

// Get all categories created by the logged-in user
router.get('/categories', upload.none(), authenticateJWT, getCategories);

// Update a category by ID
router.put('/categories/:id', upload.none(), authenticateJWT, updateCategory);

// Delete a category by ID
router.delete('/categories/:id', upload.none(), authenticateJWT, deleteCategory);

module.exports = router;
