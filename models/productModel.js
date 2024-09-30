const mongoose = require('mongoose');


//This schema is for storing product details and their categorization.
const productSchema = new mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImage: [],
  description: String,
  price: Number,
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
