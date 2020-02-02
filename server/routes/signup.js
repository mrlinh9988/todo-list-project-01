const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Sign up' })
})

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    bcrypt.hash(password, saltRounds).then(function (hashPassword) {
        UserModel.create({
            username: username,
            password: hashPassword
        }).then(data => {
           res.json("Create success")
        }).catch(err => {
            console.log(err);
        })
    });


})


module.exports = router;