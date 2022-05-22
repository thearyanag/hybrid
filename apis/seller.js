const seller = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Catalog = require('../models/catalog');
const Order = require('../models/order');

seller.post('/create-catalog', auth, async (req, res) => {
    try {
        const { products } = req.body;
        const {username}  = req.body;
 
        const user = await User.findOne({ 'username' : username } , function(err,doc){
            if(err){
                console.log(err);
                }
            else{
                console.log(doc);
            }
        }).clone();
        const catalog = new Catalog({
            seller_id: user.username,
            products
        });
        await catalog.save();
        res.status(200).json(catalog);
    } catch (err) {
        res.status(400).send(err);
    }
});

seller.get('/orders', auth, async (req, res) => {
    try {
        const { username } = req.body;
        const orders = await Order.find({ seller_id: username });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = seller;