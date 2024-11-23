const { Trainer, User, Class } = require('../../associations');

const getAdminTrainers = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login

        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        // Cari semua trainer yang dibuat oleh user yang login
        const trainers = await Trainer.findAll({
            attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number'],
            include: [
                {
                    model: Class,
                    as: 'class',
                    attributes: ['name', 'alamat'],
                    paranoid: false,
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['name', 'kota', 'alamat', 'phone_number', 'email']
                }
            ],
            order: [['createdAt', 'DESC']],
            paranoid: false,
        });


        res.status(200).json({ trainers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve trainers', error: error.message });
    }
};



module.exports = { getAdminTrainers };
