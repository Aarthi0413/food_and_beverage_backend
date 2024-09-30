const Product = require("../models/productModel");

const getCategoryWiseProduct = async(req, res) => {
    try{
        const {category}= req?.body || req?.query;
        const product = await Product.find({category})
        res.json({message: "Product of the category", error: false, success: true, data: product});
    }catch(error){
        res.json({message: error.message, error: true, success: false});
    }
}

module.exports = getCategoryWiseProduct;