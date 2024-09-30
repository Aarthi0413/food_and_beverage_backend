const AddToCart = require("../models/cartProduct");

const countAddToCartProduct = async(req, res) => {
    try{    
        const userId = req.userId;
        const count = await AddToCart.countDocuments({userId: userId});
        res.json({message:"ok", error:false, success:true, data: {count: count}});
    }catch(error){
        res.json({message:error.message, error:true, success: false});
    }
}

module.exports = countAddToCartProduct;