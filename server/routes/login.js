var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')
var path = require('path')

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
})

router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    userModel.auth(username, password)
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                res.json({
                    status: 400,
                    message: 'Login fail'
                })
                next('err');
            }

            res.json({
                status: 200,
                message: 'Login success'
            })
            next();
        })
        .catch(err => {
            console.log('fail');
        })

})

module.exports = router;