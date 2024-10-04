const stripe = require("../config/stripe");
const User = require("../models/userModel");

const payment = async (req, res) => {
  try {
    const { cartItems,guestCount, timeSlot, paymentOption, amount } = req.body;
    console.log("Received amount for payment:", amount);

    const user = await User.findOne({_id:req.userId})

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email:user.email,
      metadata:{
        userId : req.userId,
        guestCount: JSON.stringify(guestCount),
        timeSlot: timeSlot || "",
        paymentOption: paymentOption,
      },
      line_items : cartItems.map((item,index)=>{
        return{
            price_data : {
              currency : 'inr',
              product_data : {
                name : item.productId.productName,
                images : item.productId.productImage,
                metadata : {
                    productId : item.productId._id
                }
              },
              unit_amount : item.productId.price * (paymentOption === "half" ? 0.5 : 1) * 100,
            },
            adjustable_quantity : {
                enabled : true,
                minimum : 1
            },
            quantity : item.quantity
        }
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    res.json({
      message: "Payment successful",
      error: false,
      success: true,
      data: session,
    });
  } catch (error) {
    res.json({ message: error?.message || error, error: true, success: false });
  }
};

module.exports = payment;