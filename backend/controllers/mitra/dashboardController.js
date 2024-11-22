const { Class, Payment, Memberships, User } = require('../../associations');
const { Op } = require('sequelize');

const getCounts = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await User.findOne({ where: { id: userId } });

        if (!userData || userData.role !== 'mitra') {
            return res.status(403).json({ message: 'Anda tidak dapat mengakses data ini' });
        }

        const classData = await Class.findAll({
            where: {
                createdBy: userId,
            },
            include: [
                {
                    model: Memberships,
                    as: 'members',
                    where: { status: 'active' },
                    required: false,
                },
                {
                    model: Payment,
                    as: 'payments',
                    where: {
                        [Op.or]: [
                            { status_pembayaran: 'Diterima' },
                            { status_pembayaran: 'Ditolak' },
                            { status_pembayaran: 'Diproses' }
                        ]
                    },
                    required: false,
                },
            ]
        });

        // Count total classes
        const countClasses = classData.length;

        // Count total active memberships
        const countMemberships = classData.reduce((acc, classItem) => {
            const activeMembers = classItem.members.filter(member => member.status === 'active');
            return acc + activeMembers.length;
        }, 0);

        // Count total income from payments
        const countTotal = classData.reduce((acc, classItem) => {
            const paidPayments = classItem.payments.filter(payment => payment.status_pembayaran === 'Diterima');
            return acc + (classItem.price * paidPayments.length);
        }, 0);

        // Count payments status
        const paymentStatusCounts = classData.reduce((acc, classItem) => {
            classItem.payments.forEach(payment => {
                if (payment.status_pembayaran === 'Diterima') {
                    acc.diterima += 1;
                } else if (payment.status_pembayaran === 'Ditolak') {
                    acc.ditolak += 1;
                } else if (payment.status_pembayaran === 'Diproses') {
                    acc.diproses += 1;
                }
            });
            return acc;
        }, { diterima: 0, ditolak: 0, diproses: 0 });

        // Respond with counts
        res.status(200).json({
            countClasses,
            countMemberships,
            countTotal,
            paymentStatusCounts, // Adding payment status counts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCounts };
