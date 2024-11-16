const { Memberships, User, Class } = require('../../associations'); // Import Models Membership, User, Class

// Function to get memberships where `user_id` matches `req.userId`
const getUserMemberships = async (req, res) => {
    try {
        const userId = req.userId;

        const memberships = await Memberships.findAll({
            where: { user_id: userId }, // Filter by user_id matching the logged-in user
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'kota', 'alamat'] // Include user data (can adjust as needed)
                },
                {
                    model: Class,
                    as: 'class',
                    attributes: ['id', 'name', 'alamat'] // Include class data (can adjust as needed)
                }
            ],
            attributes: ['id', 'user_id', 'class_id', 'createdAt', 'updatedAt'] // Include membership-related attributes
        });

        if (memberships.length === 0) {
            return res.status(404).json({ message: 'User has no memberships!' });
        }

        res.status(200).json({ memberships });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserMemberships };
