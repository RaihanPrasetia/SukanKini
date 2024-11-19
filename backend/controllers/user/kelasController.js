const { Memberships, User, Class, ClassSchedule } = require('../../associations');
const moment = require('moment'); // Pastikan moment.js terinstal
moment.locale('id'); // Import Models Membership, User, Class

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


const getClassNow = async (req, res) => {
    try {
        const userId = req.userId;

        // Ambil hari ini dalam bahasa Indonesia (misalnya: "Senin", "Selasa", dll.)
        const hariSekarang = moment().format('dddd');

        const memberships = await Memberships.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'kota', 'alamat'], // Data user
                },
                {
                    model: Class,
                    as: 'class',
                    attributes: ['id', 'name', 'alamat', 'price', 'image_path'], // Data kelas
                    include: [
                        {
                            model: ClassSchedule,
                            as: 'schedules',
                            attributes: ['hari', 'jam'],
                            where: {
                                hari: hariSekarang, // Filter berdasarkan hari sekarang
                            },
                        },
                    ],
                },
            ],
            attributes: ['id', 'user_id', 'class_id', 'createdAt', 'updatedAt'], // Data keanggotaan
        });

        if (memberships.length === 0) {
            return res.status(404).json({ message: 'Tidak ada kelas yang sesuai jadwal hari ini!' });
        }

        res.status(200).json({ memberships });
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan: ${error.message}` });
    }
};



const createMembership = async (req, res) => {
    try {
        const userId = req.userId;

        const { class_id, status } = req.body;

        const newMembership = await Memberships.create({
            user_id: userId,
            class_id,
            status: status || 'active',
        });

        res.status(201).json({ message: 'Membership created successfully!', membership: newMembership });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUserMemberships, createMembership, getClassNow };
