let jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    // let token = req.body.token;
    //  let headers = req.headers.authorization.split(' ');

    // let token = headers[1];
    let token = req.cookies.token

    if (token) {

        // cách 1: Dùng res.locals
        jwt.verify(token, 'linh', function (err, decoded) {
            console.log('decoded: ', decoded.data);
            let type = decoded.data.type;
            // if (type === 1) {
            //     res.locals = 1;
            //     next();
            // } else if (type === 3) {
            //     res.locals = 3;
            //     next();
            // }
            res.locals = type;
            next()
        });

    } else {
        res.json('No token found')
    }

}

module.exports = {
    checkLogin
}