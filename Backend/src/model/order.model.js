const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [orderItemSchema],
    total_amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true })

const orderModel = mongoose.model('orders', orderSchema)
module.exports = orderModel
