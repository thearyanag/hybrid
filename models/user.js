const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    auth_Token : {
        type: String,
    },
    user_type : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
});
