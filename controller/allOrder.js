const Order = require("../models/orderProductModel")
const User = require("../models/userModel")

const allOrder = async(req, res) => {
    const userId = req.userId
    const user = await User.findById(userId)

    if(user.role !== "ADMIN"){
        return res.status(403).json({message: "Forbidden", error: true, success: false})
    }

    const allOrders = await Order.find().sort({createdAt:-1})
    return res.status(200).json({message: "All orders", data: allOrders, error: false, success: true })
}

module.exports = allOrder;