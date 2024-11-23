const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Bank = require('../models/bankModel');
require('dotenv').config();



const register = async (req, res) => {
  const { name, email, password, phone_number, age, height, weight, kota, alamat, image_path } = req.body;

  try {
    // ... Validation checks ...

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

    const { id, password: _, ...userData } = newUser.dataValues;

    // Set token expiration to 30 days (30d)
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }  // Token will expire in 30 days
    );

    res.status(201).json({ message: 'User registered successfully.', token, user: userData });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
  }
};

const registerMitra = async (req, res) => {
  const {
    name, email, password, phone_number, an, brand, no_rek, kota, alamat, age, height, weight
  } = req.body;

  try {
    // ... Validation checks ...

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
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
      isBlocked: false,
    });

    await Bank.create({
      an,
      brand: brand.toUpperCase(),
      no_rek,
      createdBy: newUser.id,
    });

    const { id, password: _, ...userData } = newUser.dataValues;

    // Set token expiration to 30 days (30d)
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }  // Token will expire in 30 days
    );

    res.status(201).json({ message: 'User registered successfully.', token, user: userData });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email not registered. Please sign up first.' });
    }

    // Check if the account is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    // Match the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Send response with token and user data
    res.status(200).json({
      message: 'Login successful.',
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
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
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