const { Trainer } = require('../../associations');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


// Tentukan path folder tujuan
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

const createTrainer = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const { name, age, alamat, phone_number } = req.body;

        // Validasi input
        if (!name || !age || !alamat || !phone_number) {
            return res.status(400).json({ message: 'Missing required fields: name, age' });
        }

        if (phone_number) {
            const phoneExists = await Trainer.findOne({ where: { phone_number } });
            if (phoneExists) {
                return res.status(400).json({ message: 'Phone number already exists.' });
            }
        }

        let imagePath = null;
        if (req.file) {
            imagePath = `${req.file.filename}`;

            const dir = path.join(__dirname, '../../public/images/trainer', imagePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } else {
            return res.status(400).json({ message: 'Missing image proof (photo)' });
        }


        // Buat data trainer baru
        const newTrainer = await Trainer.create({
            name,
            age,
            image_path: imagePath,
            phone_number,
            alamat,
            createdBy: userId,
        });

        res.status(201).json({ message: 'Trainer created successfully', trainer: newTrainer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create trainer', error: error.message });
    }
};


const getTrainers = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login

        // Cari semua trainer yang dibuat oleh user yang login
        const trainers = await Trainer.findAll({
            where: { createdBy: userId },
            attributes: ['id', 'name', 'age', 'image_path', 'alamat', 'phone_number'], // Pilih atribut yang diperlukan
            order: [['createdAt', 'DESC']], // Urutkan berdasarkan waktu pembuatan terbaru
        });


        res.status(200).json({ trainers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve trainers', error: error.message });
    }
};

const updateTrainer = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const trainerId = req.params.id; // ID Trainer dari URL params
        const { name, age, phone_number, alamat } = req.body; // Data yang akan diupdate

        // Cari trainer berdasarkan ID dan validasi createdBy
        const trainer = await Trainer.findOne({ where: { id: trainerId, createdBy: userId } });

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found or you are not authorized to update this trainer' });
        }

        // Update hanya kolom yang diberikan dalam request
        if (name) trainer.name = name;
        if (age) trainer.age = age;
        if (phone_number) trainer.phone_number = phone_number;
        if (alamat) trainer.alamat = alamat;

        // Handle update image file jika ada file baru yang diunggah
        if (req.file) {
            const newImagePath = `${req.file.filename}`;
            const dir = path.join(__dirname, '../../../public/images/trainer');

            // Hapus gambar lama jika ada
            if (trainer.image_path) {
                const oldImagePath = path.join(dir, trainer.image_path);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Tetapkan path gambar baru
            trainer.image_path = newImagePath;
        }

        // Simpan perubahan
        await trainer.save();

        res.status(200).json({ message: 'Trainer updated successfully', trainer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update trainer', error: error.message });
    }
};

const deleteTrainer = async (req, res) => {
    try {
        const userId = req.userId; // ID pengguna yang sedang login
        const trainerId = req.params.id; // ID Trainer dari URL params

        // Cari trainer berdasarkan ID dan validasi createdBy
        const trainer = await Trainer.findOne({ where: { id: trainerId, createdBy: userId } });

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found or you are not authorized to delete this trainer' });
        }

        // Hapus trainer
        const deleteTrainer = await Trainer.findByPk(trainerId);
        if (deleteTrainer) {
            await deleteTrainer.destroy(); // This will set the 'deletedAt' field
        }

        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete trainer', error: error.message });
    }
};

module.exports = { createTrainer, getTrainers, updateTrainer, deleteTrainer, upload };
