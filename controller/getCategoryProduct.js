const Product = require("../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {

    const productCategory = await Product.distinct("category");

    // array to store one product from each category
    const productByCategory = []

    for(let category of productCategory){
        const product = await Product.findOne({category: category})

        if(product){
            productByCategory.push(product);
        }
    }

    res.json({ message: "Products by category", error: false, success: true, data: productByCategory });


  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, error: true, success: false });
  }
};

module.exports = getCategoryProduct;
