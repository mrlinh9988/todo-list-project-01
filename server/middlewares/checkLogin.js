let jwt = require('jsonwebtoken');
let userModal = require('../model/userModel')


function checkLogin(req, res, next) {
    let token = req.body.token;

    jwt.verify(token, 'linh', function (err, decoded) {
        if (decoded.username === 'linh' && decoded.password === '123') {
            next();
        } else {
            res.json({
                message: 'Wrong token'
            })
        }
    });
}

module.exports = {
    checkLogin
}