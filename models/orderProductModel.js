const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default:[]
    },
    email:{
        type: String,
        default:""
    },
    userId:{
        type: String,
        default:""
    },
    paymentDetails:{
        paymentId:{
            type: String,
            default:""
        },
        payment_method_types :[],
        payment_status:{
            type: String,
            default:""
        }
    },
    totalAmount:{
        type: Number,
        default:0
    },
    remainingAmount: {
        type: Number,
        default: 0
    },
    tableNumbers: {
        type: Number,
        default: 1
    },
    timeSlot: {
        type: String,
        default: ""
    },
    paymentOption: {
        type: String,
        enum: ['full', 'half'],
        default: 'full'
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;