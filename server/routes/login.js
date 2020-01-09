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

    userModel.auth(username, password)
        .then(result => {
            // console.log('user: ',result[0]);

            if (result.length === 0) {
                // res.json({
                //     status: 400,
                //     message: 'Login fail'
                // })
                // next('err');
                res.json({
                    status: 400,
                    message: 'Login fail'
                })
            } else {
                let data = {
                    username: result[0].username,
                    password: result[0].password,
                    type: result[0].type
                }

                jwt.sign(data, 'linh', { expiresIn: "1 days" }, (err, token) => {
                    res.json({
                        status: 200,
                        token: token
                    })


                })

                // res.json({
                //     status: 200,
                //     message: 'Login success'
                // })
            }
        })
        .catch(err => {
            console.log('fail');
        })
})

module.exports = router;