var express = require('express');
var router = express.Router();
const redisClient = require('../config/redisConnect');

router.get('/', async (req, res) => {
    // logout user
    // save token in redis
    const token = req.headers.authorization.split(' ')[1];

    // const token = localStorage.getItem('token')
    // console.log(token);
    // console.log('token2: ', token);
    try {
        redisClient.LPUSH('token', token, (err, backlist) => {
            // console.log('backlist', backlist);

            // res.render('signin')
            return res.status(200).json({
                'status': 200,
                'data': 'You are logged out',
            });
        });

    } catch (error) {
        return res.status(400).json({
            'status': 500,
            'error': error.toString(),
        });
    }
})

module.exports = router;