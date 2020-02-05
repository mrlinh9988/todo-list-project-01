const express = require('express');
const router = express.Router();
const RefreshToken = require('../model/tokenModel');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const redisClient = require('../config/redisConnect');

router.post('/', async (req, res, next) => {
    const refreshToken = req.body.refreshToken;

    try {
        // redisClient.lrange('token', 0, -1, (err, backlist) => {
        //     console.log(backlist.includes(refreshToken));
        //     if(backlist.includes(refreshToken)) {
        //         return res.json({
        //             message: 'Can\'t not use this refresh token'
        //         })
        //     }
        // });

        let token = await RefreshToken.find({ refreshToken });
        console.log(token);

        if (token.length > 0) {
            let decoded = await jwt.verify(refreshToken, 'refresh_token');

            let user = await User.findById(decoded.data._id);

            const data = {
                _id: user._id,
                type: user.type
            }

            const newAccessToken = jwt.sign({ data }, 'linh', { expiresIn: '1h' })

            res.json({
                token: newAccessToken
            });
        }

    } catch (error) {
        console.log(err);
        res.status(403).json({
            message: 'Invalid refresh token'
        });
    }

});

module.exports = router;