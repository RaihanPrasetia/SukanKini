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
            where: {
                [Op.and]: [
                    { user_id: userId },  // Menyaring berdasarkan user_id
                    { status: 'active' },  // Menyaring berdasarkan user_id
                ]
            }, // Filter by user_id matching the logged-in user
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'kota', 'alamat'] // Include user data (can adjust as needed)
                },
                {
                    model: Class,
                    as: 'class',
                    attributes: ['id', 'name', 'alamat', 'image_path', 'deletedAt'],
                    include: [
                        {
                            model: ClassSchedule,
                            as: 'schedules',
                            attributes: ['hari', 'jam']
                        }
                    ],
                    paranoid: false, // Include class data (can adjust as needed)
                }
            ],
            attributes: ['id', 'user_id', 'class_id', 'createdAt', 'updatedAt', 'deletedAt'] // Include membership-related attributes
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
            where: {
                [Op.and]: [
                    { user_id: userId },  // Menyaring berdasarkan user_id
                    { status: 'active' },  // Menyaring berdasarkan user_id
                ]
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'kota', 'alamat'], // Data user
                },
                {
                    model: Class,
                    as: 'class',
                    attributes: ['id', 'name', 'alamat', 'price', 'image_path', 'deletedAt'], // Data kelas
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
                    where: {
                        deletedAt: null
                    }
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
                    attributes: ['id', 'name', 'image_path'],
                    where: { deletedAt: null },
                    paranoid: true,
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
            return res.status(404).json({ message: 'Class Sudah Tidak Tersedia' });
        }

        // Get the createdBy value and category of the retrieved class
        const classData = allClass[0];
        const categoryId = classData.category_id;

        // Retrieve related/recommended classes - for example, same category
        const relatedClasses = await Class.findAll({
            where: {
                [Op.or]: [
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
                    attributes: ['id', 'name', 'image_path'],
                    where: { deletedAt: null },
                    paranoid: false,
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


module.exports = { getUserMemberships, getClassNow, getAllClass, getClassById };
