const AddToCart = require("../models/cartProduct");

const updateAddToCartProduct = async(req, res) => {
    try{

        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
        const qty = req.body.quantity

        // if product available then update quantity
        const updateProduct = await AddToCart.updateOne({_id:addToCartProductId}, {
            ...(qty && { quantity: qty})
        })

        res.json({message: 'Product updated successfully', data:updateProduct,error:false,success:true })

    }catch(error){
        res.json({message:error.message || error, error:true, success:false});
    }
}

module.exports = updateAddToCartProduct;