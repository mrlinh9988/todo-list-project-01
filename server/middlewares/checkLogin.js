let jwt = require('jsonwebtoken');
let userModal = require('../model/userModel')
var path = require('path');


function checkLogin(req, res, next) {
    // let token = req.body.token;
    let token = req.cookies.token;
    if (token) {
        // console.log('có token');
        jwt.verify(token, 'linh', function (err, decoded) {
            userModal.auth(decoded.username, decoded.password)
                .then(result => {
                    // console.log('decoded: ', result[0]);
                    if (result.length === 0) {
                        res.json({
                            message: 'Wrong token'
                        })
                        console.log('wrong token');
                    } else {
                        res.locals = result[0].type;
                        next();
                    }
                })
                .catch(err => {
                    console.log('fail');
                })
        });

    } else {
        res.locals = 0;
        res.sendFile(path.join(__dirname, '../public/html/index2.html'))
        next();
    }
    // console.log('cookie token: ', token);

    // jwt.verify(token, 'linh', function (err, decoded) {
    //     if (decoded.username === 'linh' && decoded.password === '123') {
    //         next();
    //     } else {
    //         res.json({
    //             message: 'Wrong token'
    //         })
    //     }
    // });

}

module.exports = {
    checkLogin
}