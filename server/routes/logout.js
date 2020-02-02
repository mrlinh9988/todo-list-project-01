var express = require('express');
var router = express.Router();
const redisClient = require('../config/redisConnect');

router.get('/', async (req, res) => {
    // logout user
    // save token in redis
    const token = req.headers.authorization.split(' ')[1];
    console.log('token2: ', token);
    try {
        let backlist = await redisClient.LPUSH('token', token);
        console.log('backlist', backlist);
        return res.status(200).json({
            'status': 200,
            'data': 'You are logged out',
        });
    } catch (error) {
        return res.status(400).json({
            'status': 500,
            'error': error.toString(),
        });
    }
})

module.exports = router;