const mongoose = require('mongoose');
const { Schema } = mongoose;

// diff seller can have diff price for same item in there catalog so no sep need for 
const Catalog = new Schema({
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

module.exports = Catalog;