const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();


const profil = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, password, age, weight, height, phone_number, gender, kota, alamat } = req.body;

    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own profile.' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (phone_number && phone_number !== user.phone_number) {
            const phoneExists = await User.findOne({ where: { phone_number } });
            if (phoneExists) {
                return res.status(400).json({ message: 'Phone number already exists' });
            }
            user.phone_number = phone_number;
        }

        if (email) user.email = email;
        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (age) user.age = age;
        if (weight) user.weight = weight;
        if (height) user.height = height;
        if (kota) user.kota = kota;
        if (alamat) user.alamat = alamat;
        if (gender) user.gender = gender;

        await user.save();

        // Destructure user data to exclude password
        const { password: _, ...userWithoutPassword } = user.toJSON();

        res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own profile.' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { deleteUser, updateUser, profil };