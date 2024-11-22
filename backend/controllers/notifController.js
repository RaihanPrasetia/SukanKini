const { User, Notification } = require('../associations');
const { Op } = require('sequelize');

const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await Notification.findAll({
            where: {
                user_id: userId, // Menyaring berdasarkan user_id
            },
            include: [
                { model: User, as: 'from', attributes: ['name', 'email', 'phone_number'] }, // Informasi pengirim
                { model: User, as: 'to', attributes: ['name', 'email', 'phone_number'] }, // Informasi penerima
            ],
            attributes: ['id', 'title', 'message', 'type', 'isRead', 'createdAt', 'updatedAt'],
            order: [
                ['isRead', 'ASC'], // Urutkan berdasarkan `isRead` (false lebih dulu)
                ['createdAt', 'DESC'], // Urutkan berdasarkan waktu pembayaran terbaru
            ],
        });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }

        res.status(200).json({ notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve notifications.', error: error.message });
    }
};


const updateNotificationReadStatus = async (req, res) => {
    try {
        const { id } = req.params; // ID notifikasi dari parameter URL

        // Cari notifikasi berdasarkan ID
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        // Perbarui status `isRead`
        await notification.update({ isRead: true });

        res.status(200).json({ message: 'Notification marked as read.', notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update notification status.', error: error.message });
    }
};




module.exports = {
    getNotifications,
    updateNotificationReadStatus,
};
