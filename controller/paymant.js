const Order = require("../models/orderProductModel");
const User = require("../models/userModel");
const CartProduct = require("../models/cartProduct");

const payment = async (req, res) => {
  try {
    const { cartItems, guestCount, timeSlot, paymentOption } = req.body;

    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    console.log("Calculated total amount for payment:", totalAmount);

    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const paidAmount = paymentOption === "half" ? totalAmount / 2 : totalAmount;
    const remainingAmount = totalAmount - paidAmount;

    const newOrder = new Order({
      productDetails: cartItems,
      email: user.email,
      userId: user._id,
      totalAmount: totalAmount,
      remainingAmount: remainingAmount,
      guestCount: guestCount,
      timeSlot: timeSlot || "",
      paymentOption: paymentOption,
      paymentDetails: {
        paymentId: "manual",
        payment_method_types: ["manual"],
        payment_status: remainingAmount > 0 ? "partial" : "paid",
      },
    });

    await newOrder.save();

    await CartProduct.deleteMany({ userId: user._id });

    res.status(200).json({
      message: "Payment successful",
      success: true,
      redirect_url: `${process.env.FRONTEND_URL}/success`,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      message: error.message || "Payment processing failed",
      error: true,
    });
  }
};

module.exports = payment;
