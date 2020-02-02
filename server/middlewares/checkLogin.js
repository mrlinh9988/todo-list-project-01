let jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConnect');
const User = require('../model/userModel');

const auth = {
    async checkLogin(req, res, next) {
        // let token = req.body.token;
        let headers = req.headers['authorization'].split(' ') || req.params.token;

        let token = headers[1];
        // let token = req.cookies.token;

        console.log('token1: ', token);

        if (!token) {
            return res.status(401).send({
                status: 401,
                error: 'You need to Login',
            });
        }


        // const decrypt = await jwt.verify(token, 'linh');
        // console.log('decrypt: ', decrypt);

        // jwt.verify(token, 'linh', function (err, decoded) {

        //     console.log('data decoded: ', decoded);

        //     let type = decoded.data.type;

        //     res.locals = type;
        //     next()
        // });

        try {

            redisClient.lrange('token', 0, 9999999, (err, result) => {
                console.log('backlist: ', result);
                if (result.indexOf(token) > -1) {
                    console.log('ton tai trong blacklist');
                    return res.status(400).json({
                        status: 400,
                        error: 'Invalid Token'
                    });
                }
            });

            const decrypt = await jwt.verify(token, 'linh');
            // console.log('decrypt: ', decrypt.data);

            const user = await User.findById(decrypt.data._id);
            if (!user) {
                return res.status(403).json({
                    status: 403,
                    error: ' Token Not accessible',
                });
            }

            // console.log('user: ', user);

            next();
        } catch (error) {
            return res.status(501).json({
                status: 501,
                error: error.toString(),
            });
        }
        // if (token) {

        //     // cách 1: Dùng res.locals

        // } else {
        //     res.json('No token found')
        // }

    }
}

module.exports = auth