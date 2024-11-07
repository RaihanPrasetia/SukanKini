const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { Bank } = require('../models');
require('dotenv').config();



const register = async (req, res) => {
  const { name, email, password, phone_number, age, height, weight, kota, alamat, } = req.body;

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
      role: 'user', // Default role
      isBlocked: false, // Default to not blocked
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
    name, email, password, phone_number, an, bank, no_rek, kota, alamat, age, height, weight
  } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !an || !bank || !no_rek) {
      return res.status(400).json({ message: 'Name, email, password, phone number, and bank details (an, bank, no_rek) are required.' });
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

    // Create a new bank record if no duplicate found
    const newBank = await Bank.create({
      an,           // Account Name
      bank,         // Bank Name
      no_rek,       // Account Number
    });

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
      bank_id: newBank.id,  // Associate the bank_id with the newly created bank
      kota,
      alamat,
      role: 'mitra',  // Default role
      isBlocked: false,  // Default to not blocked
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





const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email anda belum terdaftar, Silahkan daftar terlebih dahulu.' });
    }

    // Check if the user account is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token and a success message
    res.status(200).json({
      message: 'User logged in successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        weight: user.weight,
        height: user.height,
        isBlocked: user.isBlocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  } catch (error) {
    console.error('Error during user login:', error); // Log the error for debugging
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