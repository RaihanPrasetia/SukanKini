const { Payment, User, Bank, Class } = require('../../associations');
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
                { model: Bank, as: 'bank', attributes: ['an', 'no_rek', 'brand'] },
                { model: Class, as: 'class', attributes: ['name', 'category_id'] },
                { model: User, as: 'to', attributes: ['name', 'email', 'phone_number'] },
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total'],
            order: [['createdAt', 'DESC']],
        });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payment records found for this user.' });
        }

        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve payment records.', error: error.message });
    }
};

const createPayment = async (req, res) => {
    try {
        const userId = req.userId;
        const { bank_id, class_id, total } = req.body;
        if (!bank_id || !total) {
            return res.status(400).json({ message: 'Missing required fields: bank_id, total' });
        }

        const bankData = await Bank.findOne({ where: { id: bank_id } });
        if (!bankData) {
            return res.status(404).json({ message: 'Bank not found' });
        }

        const classData = await Class.findOne({ where: { id: class_id } });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

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

        const newPayment = await Payment.create({
            user_id: classData.createdBy,
            bank_id,
            bukti: buktiPath,
            status_pembayaran: 'Diproses',
            total,
            class_id,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
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