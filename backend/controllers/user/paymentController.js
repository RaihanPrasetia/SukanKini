const { Payment, User, Bank, Class, Memberships, Category, ClassSchedule, Notification } = require('../../associations');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../../public/bukti');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname).toLowerCase();

        cb(null, `${uniqueSuffix}${fileExt}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
    }
});

const getUserPayments = async (req, res) => {
    try {
        const userId = req.userId;


        const payments = await Payment.findAll({
            where: {
                [Op.or]: [
                    { user_id: userId },
                    { createdBy: userId }
                ]
            },
            include: [
                {
                    model: Bank, as: 'bank', attributes: ['an', 'no_rek', 'brand'],
                    where: {
                        [Op.or]: [
                            { deletedAt: null }, // Trainer aktif
                            { deletedAt: { [Op.ne]: null } } // Trainer telah dihapus
                        ]
                    },
                    paranoid: false,
                },
                {
                    model: Class, as: 'class', attributes: ['id', 'name'], include: [
                        {
                            model: Category, as: 'category', attributes: ['name']
                        },
                        {
                            model: ClassSchedule, as: 'schedules',
                            attributes: ['id', 'hari', 'jam']
                        },
                    ]
                },
                { model: User, as: 'to', attributes: ['name', 'email', 'phone_number'] },
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });



        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve payment records.', error: error.message });
    }
};

const createPayment = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang login
        const { bank_id, class_id, total } = req.body;

        // Validasi input
        if (!bank_id || !total) {
            return res.status(400).json({ message: 'Missing required fields: bank_id, total' });
        }

        const userData = await User.findOne({ where: { id: userId } });
        if (!userData) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        // Cek apakah kelas ada
        const classData = await Class.findOne({ where: { id: class_id } });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Cek apakah pengguna sudah terdaftar di kelas ini
        const existingMembership = await Memberships.findOne({
            where: {
                [Op.and]: [
                    { user_id: userId },
                    { class_id: class_id },
                    {
                        [Op.or]: [
                            { status: 'active' },
                            { status: 'pending' }
                        ]
                    }
                ]
            },
        });

        if (existingMembership) {
            return res.status(400).json({
                message: 'User is already enrolled in this class',
            });
        }

        // Cek apakah bank ada
        const bankData = await Bank.findOne({ where: { id: bank_id } });
        if (!bankData) {
            return res.status(404).json({ message: 'Bank not found' });
        }

        const userBank = await User.findOne({ where: { id: bankData.createdBy } })
        if (!userBank) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Proses file bukti pembayaran
        let buktiPath = null;
        if (req.file) {
            buktiPath = `${req.file.filename}`;
            const dir = path.join(__dirname, '../../../public/bukti');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } else {
            return res.status(400).json({ message: 'Missing payment proof (bukti)' });
        }
        await Payment.create({
            user_id: classData.createdBy,
            bank_id,
            bukti: buktiPath,
            status_pembayaran: 'Diproses',
            total,
            class_id,
            createdBy: userId,
        });

        // Buat entri membership baru
        await Memberships.create({
            class_id: class_id,
            user_id: userId,
            status: 'pending',
        });

        const notificationMessageToUser = `Pembayaran pendaftaran untuk kelas ${classData.name} Anda sebesar Rp${total.toLocaleString()} melalui bank ${bankData.brand} telah diterima dan sedang diproses oleh ${userBank.name}. Harap tunggu konfirmasi selanjutnya.`;
        await Notification.create({
            title: "Pembayaran Pendaftaran Kelas",
            message: notificationMessageToUser,
            type: "info",
            user_id: userId,
            createdBy: userId,
        });

        // Buat notifikasi untuk admin
        const notificationMessageToRecipient = `${userData.name} telah mengirimkan pembayaran sebesar Rp${total.toLocaleString()} untuk kelas ${classData.name} melalui bank ${bankData.brand}. Mohon segera verifikasi pembayaran.`;
        await Notification.create({
            title: "Pembayaran Daftar Kelas",
            message: notificationMessageToRecipient,
            type: "warning",
            user_id: userBank.id,
            createdBy: userId,
        });


        res.status(201).json({
            message: 'Payment created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create payment', error: error.message });
    }
};


module.exports = {
    getUserPayments,
    createPayment,
    upload
};