const { Payment, User, Bank, Class, ClassSchedule, Memberships, Notification } = require('../../associations');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../../public/bukti');

        // Periksa apakah folder sudah ada, jika belum buat folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Gunakan angka acak sebagai nama file
        const uniqueSuffix = Math.round(Math.random() * 1E9); // Angka acak unik
        const fileExt = path.extname(file.originalname).toLowerCase(); // Ekstensi file

        // Gabungkan nama file dengan ekstensi asli
        cb(null, `${uniqueSuffix}${fileExt}`);
    }
});

// Setup Multer dengan pengaturan storage dan validasi file
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Maksimal ukuran file 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/; // Ekstensi yang diterima
        const mimetype = filetypes.test(file.mimetype); // Validasi tipe MIME
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Validasi ekstensi

        if (mimetype && extname) {
            return cb(null, true); // File diterima
        }
        cb(new Error('Only images (jpeg, jpg, png) are allowed!')); // Jika tidak sesuai, kirim error
    }
});

const getUserPayments = async (req, res) => {
    try {
        const userId = req.userId;


        const payments = await Payment.findAll({
            where: {
                [Op.or]: [
                    { user_id: userId },  // Menyaring berdasarkan user_id
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
                },  // Menyertakan informasi bank
                {
                    model: Class, as: 'class', attributes: ['name', 'category_id'],
                    include: [
                        {
                            model: ClassSchedule, as: 'schedules', attributes: ['hari', 'jam']
                        }
                    ]
                },  // Menyertakan informasi kelas (jika ada)
                { model: User, as: 'from', attributes: ['name', 'email', 'phone_number'] },  // Menyertakan informasi pengguna
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total'],
            order: [['createdAt', 'DESC']],  // Mengurutkan berdasarkan waktu pembayaran terbaru
        });



        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);  // Print error details for debugging
        res.status(500).json({ message: 'Failed to retrieve payment records.', error: error.message });
    }
};
const getStatusPayments = async (req, res) => {
    try {
        const userId = req.userId;


        const payments = await Payment.findAll({
            where: {
                [Op.and]: [
                    { user_id: 1 },
                    { createdBy: userId }
                ]
            },
            include: [
                { model: Bank, as: 'bank', attributes: ['an', 'no_rek', 'brand'] },
                { model: Class, as: 'class', attributes: ['name', 'category_id'] },
                { model: User, as: 'from', attributes: ['name', 'email', 'phone_number'] },
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total'],
            order: [['createdAt', 'DESC']],
        });



        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);  // Print error details for debugging
        res.status(500).json({ message: 'Failed to retrieve payment records.', error: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const payments = await Payment.findAll({
            where: {
                [Op.or]: [
                    { id: paymentId }
                ]
            },
            include: [
                { model: Bank, as: 'bank', attributes: ['an', 'no_rek', 'brand'] },
                { model: Class, as: 'class', attributes: ['name', 'category_id'] },
                { model: User, as: 'from', attributes: ['name', 'email', 'phone_number'] },
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total'],
            order: [['createdAt', 'DESC']],
        });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payment records found for this user.' });
        }

        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);  // Print error details for debugging
        res.status(500).json({ message: 'Failed to retrieve payment records.', error: error.message });
    }
};


const createPayment = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang melakukan pembayaran
        const { bank_id, total } = req.body;

        // Validasi input
        if (!bank_id || !total) {
            return res.status(400).json({ message: 'Bank ID dan jumlah total pembayaran diperlukan.' });
        }

        // Validasi bank
        const bankData = await Bank.findOne({ where: { id: bank_id } });
        if (!bankData) {
            return res.status(404).json({ message: 'Bank yang dipilih tidak ditemukan.' });
        }

        // Validasi pengguna
        const userData = await User.findOne({ where: { id: userId } });
        if (!userData) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        let buktiPath = null;

        // Validasi bukti pembayaran
        if (req.file) {
            buktiPath = `${req.file.filename}`;

            const dir = path.join(__dirname, '../../../public/bukti');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } else {
            return res.status(400).json({ message: 'Bukti pembayaran wajib diunggah.' });
        }

        // Buat data pembayaran
        const newPayment = await Payment.create({
            user_id: 1,
            bank_id,
            bukti: buktiPath,
            status_pembayaran: 'Diproses',
            total,
            class_id: null,
            createdBy: userId,
            isRead: false,
        });

        // Buat notifikasi untuk pengguna
        const notificationMessageToUser = `Pembayaran pendaftaran Anda sebesar Rp${total.toLocaleString()} melalui bank ${bankData.brand} telah diterima dan sedang diproses oleh Admin. Harap tunggu konfirmasi selanjutnya.`;
        await Notification.create({
            title: "Pembayaran Pendaftaran",
            message: notificationMessageToUser,
            type: "info",
            user_id: userId,
            createdBy: userId,
        });

        // Buat notifikasi untuk admin
        const adminId = 1; // ID admin
        const notificationMessageToRecipient = `Pengguna ${userData.name} telah mengirimkan pembayaran sebesar Rp${total.toLocaleString()} melalui bank ${bankData.brand}. Mohon segera verifikasi pembayaran.`;
        await Notification.create({
            title: "Pembayaran Baru",
            message: notificationMessageToRecipient,
            type: "warning",
            user_id: adminId,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Gagal membuat pembayaran.', error: error.message });
    }
};


const updatePaymentStatus = async (req, res) => {
    try {
        const userId = req.userId; // Ambil userId dari request (setelah autentikasi JWT)
        const { status_pembayaran } = req.body;  // Ambil status baru dari request body
        const paymentId = req.params.id;  // Ambil payment_id dari parameter URL

        // Validasi input
        if (!status_pembayaran) {
            return res.status(400).json({ message: 'Missing required field: status_pembayaran' });
        }

        // Cari pembayaran berdasarkan ID dan validasi user_id
        const payment = await Payment.findOne({ where: { id: paymentId } });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Validasi apakah user_id milik user yang sedang login
        if (payment.user_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this payment' });
        }


        const membership = await Memberships.findOne({
            where: {
                [Op.and]: [
                    { user_id: payment.createdBy },
                    { class_id: payment.class_id },
                ]
            }
        });
        // Update status pembayaran
        if (!membership) {
            return res.status(404).json({ message: 'Memberships not found' });
        }
        if (status_pembayaran === 'Diterima') {
            membership.status = 'active';  // Ubah status membership menjadi active
        } else if (status_pembayaran === 'Ditolak') {
            membership.status = 'inactive';  // Ubah status membership menjadi inactive jika ditolak
        } else {
            return res.status(400).json({ message: 'Invalid payment status' });
        }
        payment.status_pembayaran = status_pembayaran;
        await payment.save();
        await membership.save();

        res.status(200).json({ message: 'Payment status updated successfully', payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update payment status', error: error.message });
    }
};



module.exports = {
    getUserPayments,
    createPayment,
    updatePaymentStatus,
    getStatusPayments,
    getPaymentById,
    upload
};
