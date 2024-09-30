const AddToCart = require("../models/cartProduct");

const deleteAddToCartProduct = async(req, res) => {
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id 

        const deleteCartProduct = await AddToCart.deleteOne({_id:addToCartProductId})

        res.json({message:"Product deleted from the cart", data:deleteCartProduct, success:true, error:false})

    }catch(error){
        res.json({message: error.message || error , error: true, success: false});
    }
}

module.exports = deleteAddToCartProduct;