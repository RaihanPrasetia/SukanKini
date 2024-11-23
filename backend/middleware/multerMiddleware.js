const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tentukan path folder tujuan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../public/images/kelas');

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

module.exports = upload;
