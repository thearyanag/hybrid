const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    auth_Token : {
        type: String,
        default: null,
    },
    user_type : {
        type: String, // can be 'buyer' or 'seller'
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', User);