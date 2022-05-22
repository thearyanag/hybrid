var mongoose = require('mongoose');
const dotenv = require('dotenv').config()

var mongoDB = process.env.DATABASE_URI;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Connection succesfullll");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
