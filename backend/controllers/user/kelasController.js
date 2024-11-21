const { Memberships, User, Class, ClassSchedule, Category, Trainer } = require('../../associations');
const moment = require('moment'); // Pastikan moment.js terinstal
moment.locale('id');
const { Op } = require('sequelize');
// Import Models Membership, User, Class

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
                    attributes: ['id', 'name', 'alamat', 'image_path'],
                    include: [
                        {
                            model: ClassSchedule,
                            as: 'schedules',
                            attributes: ['hari', 'jam']
                        }
                    ] // Include class data (can adjust as needed)
                }
            ],
            attributes: ['id', 'user_id', 'class_id', 'createdAt', 'updatedAt'] // Include membership-related attributes
        });

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

        // Cari memberships yang terkait dengan user_id dan memiliki jadwal untuk hari ini
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

        // Filter memberships yang memiliki class dan schedules yang valid
        const filteredMemberships = memberships.filter(membership =>
            membership.class && membership.class.schedules && membership.class.schedules.length > 0
        );

        // Jika ada kelas dengan jadwal hari ini, kirimkan data
        res.status(200).json({ memberships: filteredMemberships });
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

const getClassById = async (req, res) => {
    const classId = req.params.id;
    try {
        // Get the class by ID
        const allClass = await Class.findAll({
            where: { id: classId },
            include: [
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: Trainer,
                    as: 'trainer',
                    attributes: ['id', 'name', 'image_path']
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name', 'alamat', 'phone_number']
                }
            ],
            attributes: ['id', 'name', 'createdBy', 'category_id', 'image_path', 'alamat', 'price', 'createdAt']
        });

        if (!allClass || allClass.length === 0) {
            return res.status(404).json({ message: 'Class not available' });
        }

        // Get the createdBy value and category of the retrieved class
        const classData = allClass[0];
        const createdBy = classData.createdBy;
        const categoryId = classData.category_id;

        // Retrieve related/recommended classes - for example, same category
        const relatedClasses = await Class.findAll({
            where: {
                [Op.or]: [
                    { createdBy: createdBy },  // Menyaring berdasarkan user_id
                    { category_id: categoryId },  // Menyaring berdasarkan user_id
                ]
            },
            include: [
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: Trainer,
                    as: 'trainer',
                    attributes: ['id', 'name', 'image_path']
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name', 'alamat', 'phone_number']
                }
            ],
            attributes: ['id', 'name', 'createdBy', 'image_path', 'alamat', 'price', 'createdAt']
        });

        // Send the response with both the class and related classes
        res.status(200).json({
            class: classData, // Send only the first (requested) class
            related: relatedClasses // Send recommended classes
        });

    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan: ${error.message}` });
    }
};



const getAllClass = async (req, res) => {

    try {
        const allClass = await Class.findAll({
            include: [
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: Trainer,
                    as: 'trainer',
                    attributes: ['id', 'name', 'image_path']
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name', 'alamat', 'phone_number']
                }
            ],
            attributes: ['id', 'name', 'createdBy', 'image_path', 'alamat', 'price', 'createdAt']
        });
        res.status(200).json({ classes: allClass });
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan: ${error.message}` });
    }


}


module.exports = { getUserMemberships, createMembership, getClassNow, getAllClass, getClassById };
