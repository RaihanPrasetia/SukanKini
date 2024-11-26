const { User } = require('../../associations');

const getUserByRole = async (req, res) => {
    try {
        const userRole = req.params.role; // Role pengguna yang ingin diambil dari parameter
        const userId = req.userId; // User ID yang diambil dari token (contohnya middleware autentikasi)

        // Verifikasi jika user saat ini adalah admin
        const admin = await User.findOne({ where: { id: userId } });
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses data ini' });
        }

        // Ambil semua data pengguna berdasarkan role
        const userData = await User.findAll({
            where: userRole ? { role: userRole } : {}, // Jika role diberikan, gunakan sebagai filter
            attributes: ['id', 'name', 'email', 'phone_number', 'age', 'image_path', 'kota', 'alamat', 'weight', 'height', 'createdAt', 'updatedAt']
        });

        // Kembalikan data pengguna
        res.status(200).json({ users: userData });
    } catch (error) {
        // Tangani kesalahan
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserByRole };
