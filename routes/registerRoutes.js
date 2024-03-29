const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../Controller/userController');

// Multer configuration for avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Uploads directory where files will be stored temporarily
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid conflicts
  },
});

const upload = multer({ storage });

// User registration route
router.post('/', upload.single('avatar'), userController.register);

module.exports = router;
