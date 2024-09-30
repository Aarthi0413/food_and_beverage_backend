const AddToCart = require("../models/cartProduct");

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await AddToCart.findOne({productId, userId: currentUser})

    if (isProductAvailable) {
      return res.json({message :"Product already exists in Add to cart", success :false, error :true})
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new AddToCart(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({ message: "Product added to cart successfully", error: false, success: true, data: saveProduct });

  } catch (error) {
    res.json({ message: error.message, error: true, success: false });
  }
};

module.exports = addToCart;
