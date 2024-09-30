const Product = require("../models/productModel");

const getProductDetails = async(req, res) => {
    try{
        const {productId} = req.body
        const product = await Product.findById(productId);

        res.json({message:"Products", error:false, success:true, data:product})
        
    }catch(error){
        res.json({message:error.message, error:true, success:false});
    }
}

module.exports = getProductDetails;