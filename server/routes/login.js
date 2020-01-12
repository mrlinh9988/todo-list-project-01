var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')
var path = require('path')
var jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
})

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    userModel.find({
        username: username,
        password: password
    }).then(result => {
        // console.log('user: ', result[0]);
        var token = jwt.sign({ data: result[0] }, 'linh', { expiresIn: "1 days" });
        res.json(token);

        // console.log('token: ', token);

    }).catch(err => {
        console.log('fail');
    })
})

module.exports = router;