let jwt = require('jsonwebtoken');

function checkAdmin(req, res, next) {
    // let token = req.body.token;
    let token = req.cookies.token;

    if (token) {
        // cách 1: Dùng res.locals
        jwt.verify(token, 'linh', function (err, decoded) {
            // console.log('decoded: ', decoded.data);
            let type = decoded.data.type;
            if (type === 1) {
                next();
            } 
        });

    } else {
        res.json("You are not admin!")
        // next()
    }

}

module.exports = {
    checkAdmin
}