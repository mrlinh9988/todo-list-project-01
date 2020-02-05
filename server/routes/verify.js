const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res, next) => {
    let { token } = req.query;

    try {
        let decrypt = await jwt.verify(token, config.verify);

        const user = await UserModel.findByIdAndUpdate(decrypt._id, { isVerify: true }, { new: true });

        console.log(user);

        if (user) {
            res.json({
                messge: 'Verify success'
            });
        }

    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = router;


