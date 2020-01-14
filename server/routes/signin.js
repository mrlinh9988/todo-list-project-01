var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')
var path = require('path')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/html/signin.html'))
})

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    userModel.find({
        username: username
    }).then(result => {
        console.log('result: ', result);

        bcrypt.compare(password, result[0].password).then(function (status) {
            if (status) {
                var token = jwt.sign({ data: result[0] }, 'linh', { expiresIn: "1 days" });
                res.json(token);
            } else {
                res.json('Wrong password')
            }
        });

    }).catch(err => {
        console.log('fail');
    })
})

module.exports = router;