const { Like, Video, User } = require('../../associations'); // Pastikan relasi sudah diatur

// **Like Video**
const likeVideo = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const { video_id } = req.body;

        // Validasi input
        if (!video_id) {
            return res.status(400).json({ message: 'Video ID is required' });
        }

        // Periksa apakah video dengan ID yang diberikan ada
        const video = await Video.findByPk(video_id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Cek apakah pengguna sudah memberikan like pada video ini
        const existingLike = await Like.findOne({
            where: { video_id, createdBy: userId },
        });

        if (existingLike) {
            // Toggle isLiked
            existingLike.isLiked = !existingLike.isLiked;
            await existingLike.save();

            // Update like_count di tabel Video
            if (existingLike.isLiked) {
                await video.increment('like_count'); // Tambahkan 1 ke like_count
            } else {
                await video.decrement('like_count'); // Kurangi 1 dari like_count
            }

            const message = existingLike.isLiked
                ? 'Video liked successfully'
                : 'Video unliked successfully';
            return res.status(200).json({ message, likeCount: video.like_count });
        }

        // Jika belum pernah di-like, tambahkan like baru
        const newLike = await Like.create({
            video_id,
            createdBy: userId,
            isLiked: true,
        });

        // Update like_count di tabel Video
        await video.increment('like_count');

        res.status(201).json({ message: 'Video liked successfully', like: newLike, likeCount: video.like_count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to like video', error: error.message });
    }
};


// **Get Likes for a Video**
const getLikes = async (req, res) => {
    try {
        const videoId = req.params.video_id; // ID video dari URL params

        // Periksa apakah video dengan ID yang diberikan ada
        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Ambil semua likes untuk video tersebut
        const likes = await Like.findAll({
            where: { video_id: videoId },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name'] // Sesuaikan dengan atribut User
            }
        });

        const likeCount = likes.filter((like) => like.isLiked).length; // Hitung jumlah like
        res.status(200).json({ likeCount, likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve likes', error: error.message });
    }
};

module.exports = { likeVideo, getLikes };
