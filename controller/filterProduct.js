const Product = require("../models/productModel");

const filterProduct = async(req, res) => {
    try{ 
        const categoryList =  req?.body?.category || [];
        const product = await Product.find({
            category: {
                "$in": categoryList
            }
        })

        res.json({message: "Filtered products", error: false, success: true, data: product})
 
    }catch(error){
        res.json({message: error.message || error, error:true, success:false})
    }
}

module.exports = filterProduct;