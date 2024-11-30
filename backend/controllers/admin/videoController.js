const { Video } = require('../../associations'); // Pastikan relasi sudah diatur
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tentukan path folder tujuan untuk upload video
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../../public/images/trainer');

        // Periksa apakah folder sudah ada, jika belum buat folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Tentukan direktori penyimpanan file
    },
    filename: (req, file, cb) => {
        // Gunakan angka acak sebagai nama file
        const uniqueSuffix = Math.round(Math.random() * 1E9); // Angka acak unik
        const fileExt = path.extname(file.originalname).toLowerCase(); // Ekstensi file

        // Gabungkan nama file dengan ekstensi asli
        cb(null, `${uniqueSuffix}${fileExt}`);
    }
});

// Setup Multer dengan pengaturan storage dan validasi file
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Maksimal ukuran file 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/; // Ekstensi yang diterima
        const mimetype = filetypes.test(file.mimetype); // Validasi tipe MIME
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Validasi ekstensi

        if (mimetype && extname) {
            return cb(null, true); // File diterima
        }
        cb(new Error('Only images (jpeg, jpg, png) are allowed!')); // Jika tidak sesuai, kirim error
    }
});

const isValidYouTubeLink = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|e\/|playlist\?list=)([A-Za-z0-9_-]{11})([?&][^#]*)?$/;
    return youtubeRegex.test(url);
};



const createVideo = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const { title, description, video_link, thumbnail_link } = req.body;


        // Validasi input
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        if (video_link && isValidYouTubeLink(video_link)) {
            return res.status(400).json({ message: 'Invalid YouTube link' });
        }

        // Create new video entry
        const newVideo = await Video.create({
            title,
            description,
            video_link,
            thumbnail_link,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Video created successfully', video: newVideo });
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ message: 'Failed to create video', error: error.message });
    }
};


// **Get All Videos**
const getVideos = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login

        // Ambil semua video yang dibuat oleh user
        const videos = await Video.findAll({
            where: { createdBy: userId },
            attributes: ['id', 'title', 'description', 'video_link', 'thumbnail_link', 'view_count', 'like_count'],
            order: [['createdAt', 'DESC']], // Urutkan berdasarkan waktu pembuatan terbaru
        });

        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve videos', error: error.message });
    }
};

const updateVideo = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const videoId = req.params.id; // ID video dari URL params
        const { title, description, video_link, thumbnail_link } = req.body;

        // Cari video berdasarkan ID dan validasi createdBy
        const video = await Video.findOne({ where: { id: videoId, createdBy: userId } });

        if (!video) {
            return res.status(404).json({ message: 'Video not found or you are not authorized to update this video' });
        }

        // Update hanya kolom yang diberikan
        if (title) video.title = title;
        if (description) video.description = description;
        if (video_link) video.video_link = video_link;
        if (thumbnail_link) video.thumbnail_link = thumbnail_link;



        // Simpan perubahan
        await video.save();

        res.status(200).json({ message: 'Video updated successfully', video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update video', error: error.message });
    }
};

// **Delete Video**
const deleteVideo = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const videoId = req.params.id; // ID video dari URL params

        // Cari video berdasarkan ID dan validasi createdBy
        const video = await Video.findOne({ where: { id: videoId, createdBy: userId } });

        if (!video) {
            return res.status(404).json({ message: 'Video not found or you are not authorized to delete this video' });
        }

        // Hapus file video jika ada
        if (video.video_path) {
            const videoPath = path.join(__dirname, '../../../public/videos', video.video_path);
            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }
        }

        // Hapus data video dari database
        await video.destroy();

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete video', error: error.message });
    }
};

module.exports = { upload, createVideo, getVideos, updateVideo, deleteVideo };
