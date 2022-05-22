const buyer = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Catalog = require('../models/catalog');
const Prder = require('../models/order');

buyer.get('/list-of-sellers', auth, async (req, res) => {
    
    try {
        const { username } = req.user;
        const sellers = await User.find({ user_type : 'seller' });
        res.status(200).json(sellers);
    } catch (err) {
        res.status(400).send(err);
    }
});

buyer.get('/seller-catalog/:seller_id', auth, async (req, res) => {
    
    try {
        const username = req.params.seller_id;
        const catalog = await Catalog.find({ seller_id: username });
        res.status(200).json(catalog);
    } catch (err) {
        res.status(400).send(err);
    }
});

buyer.post('/create-order/:seller_id', auth, async (req, res) => {
    
    try {
        const username  = req.params.seller_id;
        const { products } = req.body;

        const order = new Order({
            buyer_id: req.user.username,
            seller_id: username,
            products
        });

        await order.save();
        res.status(200).json(order);
    } catch (err) {
        res.status(400).send(err);
    }
});
