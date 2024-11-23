const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../public/images/profile');

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

const profil = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, age, weight, height, phone_number, gender, kota, alamat } = req.body;

    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own profile.' });
    }

    try {
        const user = await User.findByPk(id);




        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (phone_number && phone_number !== user.phone_number) {
            const phoneExists = await User.findOne({ where: { phone_number } });
            if (phoneExists) {
                return res.status(400).json({ message: 'Phone number already exists' });
            }
            user.phone_number = phone_number;
        }

        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (age) user.age = age;
        if (weight) user.weight = weight;
        if (height) user.height = height;
        if (kota) user.kota = kota;
        if (alamat) user.alamat = alamat;
        if (gender) user.gender = gender;
        if (req.file) {
            const newImagePath = `${req.file.filename}`;
            const dir = path.join(__dirname, '../../public/images/trainer');

            // Hapus gambar lama jika ada
            if (user.image_path) {
                const oldImagePath = path.join(dir, user.image_path);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Tetapkan path gambar baru
            user.image_path = newImagePath;
        }


        await user.save();

        // Destructure user data to exclude password
        const { password: _, ...userWithoutPassword } = user.toJSON();

        res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own profile.' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { deleteUser, updateUser, profil, upload };