const stripe = require("../config/stripe");
const AddToCart = require("../models/cartProduct");
const Order = require("../models/orderProductModel");

const endpointSecret = process.env.STRIPE_ENDOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);

      const productData = {
        productId: product.id,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      productItems.push(productData);
    }
  }

  return productItems;
}

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(lineItems);

      const totalAmount = session.amount_total / 100;
      const paymentOption = session.metadata.paymentOption;
      const remainingAmount = paymentOption === 'half' ? totalAmount / 2 : 0;

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_types: session.payment_method_types,
          payment_status: session.payment_status,
        },
        totalAmount: totalAmount,
        remainingAmount: remainingAmount,
        tableNumbers: session.metadata.tableNumbers,
        timeSlot: session.metadata.timeSlot, 
        paymentOption: paymentOption,
      };

      const order = await Order(orderDetails);
      console.log("Order Details:", orderDetails);
      const saveOrder = await order.save();

      if(saveOrder?._id){
        const deleteCartItem = await AddToCart.deleteMany({userId: session.metadata.userId})
      }
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};

module.exports = webhook;
