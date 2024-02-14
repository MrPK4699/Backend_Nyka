const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // id: { type: String, unique: true, required: true },
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  picture: { type: String },
  description: { type: String },
  gender: { type: String, enum: ['male', 'female'], required: true },
  category: { type: String, enum: ['makeup', 'skincare', 'haircare'], required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;

