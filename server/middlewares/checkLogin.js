let jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConnect');
const User = require('../model/userModel');

const auth = {
    async checkLogin(req, res, next) {

        if (!req.headers['authorization']) {
            return res.status(401).send({
                error: 'You need to Login',
            });
        }

        let token = req.headers['authorization'].split(' ')[1];

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
            console.log(error);

            if (error.name === 'TokenExpiredError') {
                const refreshToken = req.query.refreshToken;

                if (!refreshToken) {
                    res.json({
                        message: 'You need provide refresh token to renew access token'
                    })
                } else {
                    try {
                        const newAcessToken = await jwt.verify(refreshToken, 'refresh_token');

                        const user = await User.findById(newAcessToken.data._id);

                        let data = {
                            _id: user._id,
                            type: user.type
                        }

                        if (user) {
                            const accessToken = jwt.sign({ data }, 'linh', { expiresIn: '60s' });

                            res.json({
                                newAccessToken: accessToken
                            })
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }


            }
        }
    }
}

module.exports = auth