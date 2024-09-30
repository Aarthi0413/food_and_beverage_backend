const AddToCart = require("../models/cartProduct");

const addToCartViewProduct = async(req, res) => {
    try{
        const currentUser = req.userId
        const allProduct = await AddToCart.find({userId: currentUser}).populate("productId")

        res.json({message:"All products",data:allProduct,error:false, success:true})

    }catch(error){
        res.json({message: error.message, error: true, success: false});
    }
}

module.exports = addToCartViewProduct;