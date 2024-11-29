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
                    order: [['createdAt', 'DESC']],
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
                            AND Likes.createdBy = :userId
                            AND Likes.isLiked = true
                        )
                    `),
                    'isLiked'
                ]
            ],
            order: [['createdAt', 'DESC']],
            replacements: { userId }, // Safe parameter injection
        });

        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve videos', error: error.message });
    }
};

const incrementViewCount = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Increment the view count
        video.view_count += 1;
        await video.save();

        // Fetch the updated video
        const updatedVideo = await Video.findByPk(videoId);

        res.status(200).json({
            message: 'View count updated successfully',
            video: {
                id: updatedVideo.id,
                title: updatedVideo.title,
                view_count: updatedVideo.view_count,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update view count', error: error.message });
    }
};

module.exports = { getUserVideos, incrementViewCount };
