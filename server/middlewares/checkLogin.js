let jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConnect');
const User = require('../model/userModel');

const auth = {
    async checkLogin(req, res, next) {
        let token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).send({
                error: 'You need to Login',
            });
        }

        try {

            redisClient.lrange('token', 0, 9999999, (err, result) => {

                if (result.includes(token)) {
                    console.log('ton tai trong blacklist');
                    return res.status(400).json({
                        error: 'Invalid Token'
                    });
                }
            });

            const decrypt = await jwt.verify(token, 'linh');
            // console.log('decrypt: ', decrypt.data);

            const user = await User.findById(decrypt.data._id);
            if (!user) {
                return res.status(403).json({
                    error: ' Token Not accessible',
                });
            }

            res.locals = user.type;

            next();
        } catch (error) {
            return res.status(501).json({
                error: error.toString(),
            });
        }
    }
}

module.exports = auth