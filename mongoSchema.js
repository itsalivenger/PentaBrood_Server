const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true})

const ProductModel = mongoose.model('Products', productSchema)

module.exports = ProductModel