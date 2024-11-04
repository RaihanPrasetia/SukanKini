const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/modelUser');
require('dotenv').config();


const register = async (req, res) => {
  const { name, email, password, phone_number, age, height, weight } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      age,
      height,
      weight
    });

    // Exclude the id and password from the response
    const { id, password: _, ...userData } = newUser.dataValues; // Using destructuring to omit id and password

    // Return the response
    res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User login successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = { register, login, verifyToken };
