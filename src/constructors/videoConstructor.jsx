export default class Video {
    constructor({
        id,
        title,
        description,
        video_link,
        video_path,
        view_count,
        thumbnail_link,
        thumbnail_path,
        like_count,
        comments = [],
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.videoLink = video_link;
        this.videoPath = video_path;
        this.thumbnailLink = thumbnail_link;
        this.thumbnailPath = thumbnail_path;
        this.viewCount = view_count;
        this.likeCount = like_count;
        this.comments = comments.map((comment) => ({
            id: comment.id,
            createdBy: comment.createdBy,
            message: comment.message,
            createdAt: comment.createdAt ? new Date(comment.createdAt) : null,
            owner: comment.owner
                ? {
                    name: comment.owner.name,
                    age: comment.owner.age,
                }
                : null,
        }), []);
    }
}
