const Product = require("../models/productModel");

const deleteProduct = async (req, res) => {
    try {
        const productId = req.body._id;

        // Delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found", error: true, success: false });
        }

        res.json({ message: "Product deleted successfully", success: true, error: false });
    } catch (error) {
        res.status(500).json({ message: error.message, error: true, success: false });
    }
};

module.exports = deleteProduct;