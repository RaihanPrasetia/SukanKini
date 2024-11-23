const { Class, User, Category, Trainer, ClassSchedule, Memberships } = require('../../associations');
const { Op } = require('sequelize');
const moment = require('moment');
moment.locale('id'); // Set locale ke bahasa Indonesia

/**
 * Controller untuk mengambil semua kelas (hanya untuk admin)
 */
const getAdminAllClass = async (req, res) => {
    try {
        const userId = req.userId;

        // Verifikasi apakah user adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        // Ambil semua data kelas dengan relasi
        const classes = await Class.findAll({
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name'] },
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                {
                    model: Trainer,
                    as: 'trainer',
                    attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number', 'deletedAt'],
                    paranoid: false, // Sertakan data yang sudah dihapus
                },
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Memberships,
                    as: 'members',
                    attributes: ['id', 'user_id', 'class_id'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'kota', 'alamat']
                        }
                    ]
                }
            ],
            attributes: ['id', 'name', 'alamat', 'price', 'image_path', 'createdAt', 'updatedAt', 'createdBy']
        });

        res.status(200).json({ classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller untuk mengambil kelas berdasarkan ID (hanya untuk admin)
 */
const getAdminClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const userId = req.userId;

        // Verifikasi apakah user adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        // Ambil data kelas berdasarkan ID
        const classData = await Class.findOne({
            where: { id: classId },
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name'] },
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                {
                    model: Trainer,
                    as: 'trainer',
                    attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number', 'deletedAt'],
                    paranoid: false, // Sertakan data yang sudah dihapus
                },
                {
                    model: ClassSchedule,
                    as: 'schedules',
                    attributes: ['id', 'hari', 'jam']
                },
                {
                    model: Memberships,
                    as: 'members',
                    attributes: ['id', 'user_id', 'class_id', 'status', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'kota', 'alamat', 'phone_number']
                        }
                    ]
                }
            ],
            paranoid: false,
            attributes: ['id', 'name', 'alamat', 'price', 'image_path', 'createdBy', 'createdAt', 'updatedAt']
        });

        // Jika kelas tidak ditemukan
        if (!classData) {
            return res.status(404).json({ message: 'Kelas tidak ditemukan!' });
        }

        res.status(200).json({ class: classData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAdminAllClass, getAdminClassById };
