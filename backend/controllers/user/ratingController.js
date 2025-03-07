const { Rating } = require("../../associations");

const createRating = async (req, res) => {
    try {

        const userId = req.userId; // User ID from JWT
        const { class_id, message, value } = req.body;

        // Validate required fields
        if (!message || !value) {
            return res.status(400).json({ message: 'Message, Value are required!' });
        }

        if (value > 5) {
            return res.status(400).json({ message: 'value max 5' })
        }

        // Check user role (assuming role is stored in User model)

        // Create the new class
        const newRating = await Rating.create({
            message,
            value,
            userId: userId,
            class_id: class_id,
        });


        res.status(201).json({ message: 'Rating created successfully!', rating: newRating });
    } catch (error) {
        console.error(error); // Print error
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRating }