const sequelize = require('../../../config');
const { Video, Comment, User } = require('../../associations');


const getUserVideos = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login

        const videos = await Video.findAll({
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'createdBy', 'message', 'createdAt'],
                    order: [['createdAt', 'DESC']], // Urutkan komentar berdasarkan waktu terbaru
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['name', 'age', 'image_path'],
                        }
                    ],
                },
            ],
            attributes: [
                'id',
                'title',
                'description',
                'video_link',
                'thumbnail_link',
                'view_count',
                'like_count',
                [
                    sequelize.literal(`
        EXISTS (
          SELECT 1
          FROM Likes
          WHERE Likes.video_id = Video.id
            AND Likes.createdBy = ${userId}
            AND Likes.isLiked = true
        )
      `),
                    'isLiked'
                ]
            ],
            order: [['createdAt', 'DESC']], // Urutkan video berdasarkan waktu pembuatan terbaru
        });


        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve videos', error: error.message });
    }
};


module.exports = { getUserVideos };