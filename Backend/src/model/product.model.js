const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        trim: true,
        default: 'General'
    },
    is_available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const productModel = mongoose.model('products', productSchema)
module.exports = productModel
