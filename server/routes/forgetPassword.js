const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const jwt = require('jsonwebtoken');



// router.get('/', (req, res, next) => {
//     res.render('signup', { title: 'Sign up' })
// })



router.post('/', async (req, res, next) => {
    let email = req.body.email;

    try {
        let user = await UserModel.find({ email });

        console.log(user);

        if (user.length == 0) {
            return res.json({
                message: 'Email does not exist'
            })
        }

        const payload = {
            _id: user[0]._id
        }

        let token = await jwt.sign(payload, config.forget, { expiresIn: '1d' });


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: config.user,
            to: req.body.email,
            subject: 'Test Nodemailer',
            text: `You received this message from ${config.user}`,
            html: `<p>You have got a new message</p></b><a href="${req.protocol}://${req.get('host')}/change_password?token=${token}">Click hear to change your password</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('message sent: %s', info);
            res.json(token)
    
        });

    } catch (error) {
        res.status(400).json({ error });
    }
})


module.exports = router;


