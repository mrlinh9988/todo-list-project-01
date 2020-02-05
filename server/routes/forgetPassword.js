const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const config = require('../config/config');
const jwt = require('jsonwebtoken');



router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Sign up' })
})



router.post('/', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    // try {


    // } catch (error) {
    //     res.status(400).json({ error });
    // }

    let user = await UserModel.find({ email });

    if (user.length !== 0) {
        return res.json({
            message: 'Email has been registered'
        })
    }


    bcrypt.hash(password, saltRounds).then(async function (hashPassword) {
        let newUser = await UserModel.create({ email, password: hashPassword });

        const payload = {
            _id: newUser._id,
            email: newUser.email
        }

        let token = await jwt.sign(payload, config.verify, { expiresIn: '1d' });
        res.json(token)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: config.user,
            to: req.body.email,
            subject: 'Test Nodemailer',
            text: `You received this message from ${config.user}`,
            html: `<p>You have got a new message</p></b><a href="${req.protocol}://${req.get('host')}/verify?token=${token}">Click hear to verify your email</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }

            console.log('message sent: %s', info);

        });



    });

})


module.exports = router;


