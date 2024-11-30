const { Video, Comment, User } = require('../../associations');


const getUserVideos = async (req, res) => {
    try {

        const videos = await Video.findAll({
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'createdBy', 'message', 'createdAt'],
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['name', 'age'],
                        }
                    ]
                }
            ],
            attributes: ['id', 'title', 'description', 'video_link', 'video_path', 'thumbnail_link', 'thumbnail_path', 'view_count', 'like_count'],
            order: [['createdAt', 'DESC']], // Urutkan berdasarkan waktu pembuatan terbaru
        });

        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve videos', error: error.message });
    }
};

module.exports = { getUserVideos };