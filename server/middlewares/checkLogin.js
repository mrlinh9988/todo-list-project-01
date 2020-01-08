let jwt = require('jsonwebtoken');
let userModal = require('../model/userModel')


function checkLogin(req, res, next) {
    // let token = req.body.token;
    let token = req.cookies.token;
    console.log('token: ', token);

    // jwt.verify(token, 'linh', function (err, decoded) {
    //     if (decoded.username === 'linh' && decoded.password === '123') {
    //         next();
    //     } else {
    //         res.json({
    //             message: 'Wrong token'
    //         })
    //     }
    // });
    jwt.verify(token, 'linh', function (err, decoded) {
        userModal.auth(decoded.username, decoded.password)
            .then(result => {
                if (result.length === 0) {
                    res.json({
                        message: 'Wrong token'
                    })
                    console.log('wrong token');
                } else {
                    next();
                }
            })
            .catch(err => {
                console.log('fail');
            })
    });
}

module.exports = {
    checkLogin
}