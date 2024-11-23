const { Class, Payment, User } = require('../../associations');
const { Op } = require('sequelize');

const getCountsAdmin = async (req, res) => {
    try {
        const userId = req.userId;

        // Pastikan user adalah admin
        const admin = await User.findOne({ where: { id: userId } });

        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak dapat mengakses data ini' });
        }

        // Ambil data user dengan role 'mitra' dan 'user'
        const userData = await User.findAll({
            attributes: ['id', 'role'],
        });

        const countDataMitra = userData.filter(user => user.role === 'mitra').length;
        const countDataUser = userData.filter(user => user.role === 'user').length;

        // Ambil data pembayaran milik admin saat ini
        const paymentData = await Payment.findAll({
            where: {
                user_id: userId,
            },
            paranoid: false,
        });

        // Hitung status pembayaran
        const paymentStatusCounts = paymentData.reduce((acc, payment) => {
            if (payment.status_pembayaran === 'Diterima') {
                acc.diterima += 1;
            } else if (payment.status_pembayaran === 'Ditolak') {
                acc.ditolak += 1;
            } else if (payment.status_pembayaran === 'Diproses') {
                acc.diproses += 1;
            }
            return acc;
        }, { diterima: 0, ditolak: 0, diproses: 0 });

        // Ambil data kelas
        const classData = await Class.findAll(); // Tidak lagi include Memberships dan Payment

        const countDataClass = classData.length;

        // Hitung total pendapatan dari pembayaran yang diterima
        const countTotal = paymentData
            .filter(payment => payment.status_pembayaran === 'Diterima') // Hanya pembayaran dengan status "Diterima"
            .reduce((acc, payment) => acc + (payment.total || 0), 0); // Menjumlahkan kolom 'total'


        // Respond dengan hasil perhitungan
        res.status(200).json({
            countDataMitra,
            countDataUser,
            countDataPayment: paymentStatusCounts.diterima, // Total pembayaran diterima
            countDataClass,
            countTotal,
            paymentStatusCounts,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCountsAdmin };
