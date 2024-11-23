const { Payment, User, Bank, Class, ClassSchedule } = require('../../associations');

/**
 * Controller untuk mendapatkan semua data pembayaran (khusus untuk admin)
 */
const getAdminPayments = async (req, res) => {
    try {
        const userId = req.userId;

        // Validasi apakah user adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        const payments = await Payment.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Bank,
                    as: 'bank',
                    attributes: ['an', 'no_rek', 'brand'],
                    paranoid: false, // Sertakan data yang sudah dihapus
                },
                {
                    model: User,
                    as: 'from',
                    attributes: ['id', 'name', 'email', 'phone_number']
                }
            ],
            paranoid: false,
            attributes: ['id', 'bukti', 'status_pembayaran', 'total', 'createdAt'],
            order: [['createdAt', 'DESC']] // Urutkan berdasarkan pembayaran terbaru
        });

        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengambil data pembayaran', error: error.message });
    }
};

/**
 * Controller untuk mendapatkan detail pembayaran berdasarkan ID (khusus untuk admin)
 */
const getPaymentById = async (req, res) => {
    try {
        const userId = req.userId;

        // Validasi apakah user adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        const paymentId = req.params.id;

        const payment = await Payment.findOne({
            where: { id: paymentId },
            include: [
                {
                    model: Bank,
                    as: 'bank',
                    attributes: ['an', 'no_rek', 'brand']
                },
                {
                    model: User,
                    as: 'from',
                    attributes: ['id', 'name', 'email', 'phone_number']
                }
            ],
            attributes: ['id', 'bukti', 'status_pembayaran', 'total', 'createdAt']
        });

        if (!payment) {
            return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
        }

        res.status(200).json({ payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengambil detail pembayaran', error: error.message });
    }
};

/**
 * Controller untuk memperbarui status pembayaran (khusus untuk admin)
 */
const updatePaymentStatus = async (req, res) => {
    try {
        const userId = req.userId;
        const { status_pembayaran } = req.body;
        const paymentId = req.params.id;

        // Validasi apakah user adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk memperbarui status pembayaran' });
        }

        // Cari pembayaran berdasarkan ID
        const payment = await Payment.findOne({ where: { id: paymentId } });
        if (!payment) {
            return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
        }

        payment.status_pembayaran = status_pembayaran;

        await payment.save();

        res.status(200).json({ message: 'Status pembayaran berhasil diperbarui', payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal memperbarui status pembayaran', error: error.message });
    }
};

module.exports = {
    getAdminPayments,
    getPaymentById,
    updatePaymentStatus
};
