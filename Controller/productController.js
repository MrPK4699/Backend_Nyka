const Product = require('../Models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    console.log(req.params.id)
    const product = await Product.find({_id:req.params.id});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', msg:req.params.id });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
    // const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    // const deletedProduct = await Product.findOneAndDelete({id:req.params.id});
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(202).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
