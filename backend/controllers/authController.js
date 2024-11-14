const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
require('dotenv').config();



const register = async (req, res) => {
  const { name, email, password, phone_number, age, height, weight, kota, alamat, image_path } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Check if the phone number already exists
    if (phone_number) {
      const phoneExists = await User.findOne({ where: { phone_number } });
      if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already exists.' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      kota,
      alamat,
      age,
      height,
      weight,
      role: 'user',
      isVerified: true,
      isBlocked: false,
      image_path,
    });

    // Exclude the id and password from the response
    const { id, password: _, ...userData } = newUser.dataValues; // Exclude id and password
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role }, // Use newUser to get the id and role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response
    res.status(201).json({ message: 'User registered successfully.', token, user: userData });
  } catch (error) {
    console.error('Error during user registration:', error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
  }
};

const registerMitra = async (req, res) => {
  const {
    name, email, password, phone_number, an, brand, no_rek, kota, alamat, age, height, weight
  } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !an || !brand || !no_rek) {
      return res.status(400).json({ message: 'Name, email, password, phone number, and bank details (an, brand, no_rek) are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Check if the phone number already exists
    if (phone_number) {
      const phoneExists = await User.findOne({ where: { phone_number } });
      if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already exists.' });
      }
    }

    // Check if the bank account number (no_rek) already exists
    const bankExists = await Bank.findOne({ where: { no_rek } });
    if (bankExists) {
      return res.status(400).json({ message: 'Bank account number already exists.' });
    }

    // Create a new bank record with the current user's id as createdBy


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user, associating the new bank record
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      phone_number,
      height,
      weight,
      kota,
      alamat,
      role: 'mitra',
      isVerified: false,
      isBlocked: false,  // Default to not blocked
    });

    await Bank.create({
      an,           // Account Name
      brand,        // Bank Name
      no_rek,       // Bank Account Number
      createdBy: newUser.id,  // Initially set to null to be updated later
    });

    // Update the bank's createdBy field to reference the user who created it

    // Exclude the id and password from the response
    const { id, password: _, ...userData } = newUser.dataValues; // Exclude id and password
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role }, // Use newUser to get the id and role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response
    res.status(201).json({ message: 'User registered successfully.', token, user: userData });
  } catch (error) {
    console.error('Error during user registration:', error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
  }
};






const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Periksa apakah email dan password disediakan
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email Anda belum terdaftar. Silakan daftar terlebih dahulu.' });
    }



    // Periksa apakah akun pengguna diblokir
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Akun Anda diblokir. Silakan hubungi dukungan.' });
    }

    // Cocokkan password yang diberikan dengan password yang telah di-hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Berikan respons token dan data pengguna yang aman
    res.status(200).json({
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        weight: user.weight,
        height: user.height,
        image_path: user.image_path,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login. Silakan coba lagi nanti.' });
  }
};


const cekemail = async (req, res) => {
  const { email } = req.body;

  // Validate if the email is provided and is in the correct format
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Find if the user exists with the provided email
    const isEmailRegistered = await User.findOne({
      where: {
        email: email, // or email
      },
    });

    if (isEmailRegistered) {
      // If the user exists, email is taken
      return res.json({ available: false });
    }

    // If no user is found, email is available
    return res.json({ available: true });
  } catch (error) {
    console.error("Error checking email:", error);
    // Return a 500 status code for internal server error
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};




module.exports = { register, login, verifyToken, cekemail, registerMitra };