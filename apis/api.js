const api = require('express').Router();

const authRouter = require('./auth');
const sellerRouter = require('./seller');
const buyerRouter = require('./buyer');

api.use('/auth' , authRouter);
api.use('/buyer' , buyerRouter);
api.use('/seller' , sellerRouter);

module.exports = api;