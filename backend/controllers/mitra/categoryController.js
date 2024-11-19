const { Category } = require('../../associations'); // Pastikan path benar

// Create a new category
const createCategory = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Missing required field: name' });
        }

        const newCategory = await Category.create({
            name,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

// Get all categories created by the logged-in user
const getCategories = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login

        const categories = await Category.findAll({
            where: { createdBy: userId },
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const categoryId = req.params.id; // ID kategori dari URL params
        const { name } = req.body; // Nama baru kategori

        if (!name) {
            return res.status(400).json({ message: 'Missing required field: name' });
        }

        const category = await Category.findOne({
            where: { id: categoryId, createdBy: userId },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found or not authorized to update' });
        }

        category.name = name;
        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const categoryId = req.params.id; // ID kategori dari URL params

        const category = await Category.findOne({
            where: { id: categoryId, createdBy: userId },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found or not authorized to delete' });
        }

        await category.destroy(); // Soft delete
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
