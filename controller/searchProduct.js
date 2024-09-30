const Product = require("../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i', 'g');
    const product = await Product.find({
      "$or": [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    res.json({ message: "Search Results", error: false, success: true, data: product });
  } catch (error) {
    res.json({ message: error.message || error, error: true, success: false });
  }
};
module.exports = searchProduct;
