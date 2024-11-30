
export default class Video {
    constructor({
        id,
        title,
        description,
        video_link,
        view_count,
        thumbnail_link,
        like_count,
        isLiked = false, // Tambahkan properti isLiked
        comments = [],
        likes = [],
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.videoLink = video_link;
        this.thumbnailLink = thumbnail_link;
        this.viewCount = view_count;
        this.likeCount = like_count;
        this.isLiked = isLiked; // Tetapkan nilai isLiked langsung dari respons API

        // Proses komentar
        this.comments = comments.map((comment) => ({
            id: comment.id,
            createdBy: comment.createdBy,
            message: comment.message,
            createdAt: comment.createdAt ? new Date(comment.createdAt) : null,
            owner: comment.owner
                ? {
                    name: comment.owner.name,
                    imagePath: comment.owner.image_path,
                    age: comment.owner.age,
                }
                : null,
        }));

    }
}
