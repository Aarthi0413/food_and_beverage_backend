const uploadProductPermission = require("../helpers/permission");
const Product = require("../models/productModel");

const updateProducts = async(req, res) =>{
    try{
        // only admin will be able to update the product

        if(!uploadProductPermission(req.userId)){
            return res.status(403).json({message: "You don't have permission to upload product", error: true, success: false});
        }

        const {_id, ...resBody} = req.body
        const updateProduct = await Product.findByIdAndUpdate(_id,resBody)

        res.json({message:"Product updated successfully", data:updateProduct, error:false, success:true})

    }catch(error){
        res.status(500).json({message: error.message, error: true, success: false});
    }
}

module.exports = updateProducts;