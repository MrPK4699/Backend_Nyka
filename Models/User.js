const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  avatar: { type: String },
  email: { type: String, required: true, unique: true, match: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
