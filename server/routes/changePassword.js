const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const jwt = require('jsonwebtoken');



// router.get('/', (req, res, next) => {
//     res.render('signup', { title: 'Sign up' })
// })
// router.use(checkToken.checkLogin);

router.post('/', async (req, res, next) => {

    let { password, repassword } = req.body;

    console.log(token);

    if (password !== repassword) {
        return res.json({
            error: 'Password not match!'
        })
    }

    try {

        let user = UserModel.update()

    } catch (error) {
        res.status(403).json({ error })
    }

});


module.exports = router;


