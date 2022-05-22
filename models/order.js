const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new Schema({
    buyer_id: {
        type: String,
        required: true,
    },
    seller_id: {
        type: String,
        required: true,
    },
    products : [{
        product_name: {
            type: String,
            required: true,
        },
        product_price: {
            type: Number,
            required: true,
        }
    }]
});

module.exports = mongoose.model('Order', Order);