const { Comment, Video, User } = require('../../associations'); // Pastikan relasi sudah diatur

// **Create Comment**
const createComment = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const { video_id, message } = req.body;

        // Validasi input
        if (!video_id || !message) {
            return res.status(400).json({ message: 'Video ID and message are required' });
        }

        // Periksa apakah video dengan ID yang diberikan ada
        const video = await Video.findByPk(video_id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Buat komentar baru
        const newComment = await Comment.create({
            video_id,
            createdBy: userId,
            message,
        });

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

// **Get Comments for a Video**
const getComments = async (req, res) => {
    try {
        const videoId = req.params.video_id; // ID video dari URL params

        // Periksa apakah video dengan ID yang diberikan ada
        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Ambil semua komentar untuk video tersebut
        const comments = await Comment.findAll({
            where: { video_id: videoId },
            attributes: ['id', 'message', 'createdBy', 'createdAt'], // Pilih atribut yang ingin ditampilkan
            order: [['createdAt', 'ASC']], // Urutkan berdasarkan waktu pembuatan (terlama ke terbaru)
            include: {
                model: User, // Tampilkan informasi pengguna yang membuat komentar
                attributes: ['id', 'name', 'age'], // Sesuaikan dengan atribut User
            },
        });

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
    }
};

module.exports = { createComment, getComments };
