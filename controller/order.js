const Order = require("../models/orderProductModel");

const order = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const orderList = await Order.find({ userId: currentUserId }).sort({createdAt:-1});

    res.json({
      message: "Order list",
      data: orderList,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = order;