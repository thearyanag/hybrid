const auth = require('express').Router();
const User = require('../models/user');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

auth.post('/register' , async (req,res) => {

    try {
        const { username, password, user_type } = req.body;

        if(!(username && password && user_type)){
            return res.status(400).send({
                error: "Please provide username, password and user_type"
            });
        }

        const oldUser = await User.findOne({username});

        if(oldUser){
            return res.status(400).send({
                error: "User already exists"
            });
        }

        encryptedUserPassword = await bcrypt.hash(password, 10);

        token = jwt.sign( {_id : username}, process.env.JWT_SECRET, { expiresIn: '5h' });

        const user = new User({ 'username' : username, 'password': encryptedUserPassword, 'user_type' : user_type , 'auth_Token' : token});

        await user.save(function (err,doc) {
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(doc);
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

auth.post('/login', async (req,res) => { 
    try {
        const { username, password } = req.body;

        if(!(username && password)){
            return res.status(400).send({
                error: "Please provide username and password"
            });
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).send({
                error: "User does not exist"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).send({
                error: "Invalid password"
            });
        }

        const token = jwt.sign({_id : user.username}, process.env.JWT_SECRET, { expiresIn: '1d' });

        user.token = token;

        res.status(200).json(user);

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = auth;