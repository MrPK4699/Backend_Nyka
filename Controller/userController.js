const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const {jwtSecret}= require('../config/config')
// import {v2 as cloudinary} from 'cloudinary';
          
// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'drwx1h1u6', 
  api_key: '273633911698287', 
  api_secret: 'en2rrDJOSI2Ix_efomeLnR0VBjE' 
});

// Function to upload avatar to Cloudinary
const uploadAvatar = async (file) => {
  const result = await cloudinary.uploader.upload(file.path);
  return result.secure_url;
};

exports.register = async (req, res) => {
  try {
    // Upload avatar
    // const avatarUrl = await uploadAvatar(req.file);

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user
    const user = new User({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      // avatar: avatarUrl,
    });

    await user.save();
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(402).json({ message: 'Internal server error', err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(402).json({ message: 'Internal server error',err });
  }
};
