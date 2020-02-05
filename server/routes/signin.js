var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')
var path = require('path')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var RefreshToken = require('../model/tokenModel');

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }


router.get('/', (req, res, next) => {
    res.render('signin', { title: 'Sign In' });

    // res.sendFile(path.join(__dirname, '../public/html/signin.html'))
})

router.post('/', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    userModel.find({
        email
    }).then(result => {

        let data = {
            _id: result[0]._id,
            type: result[0].type
        }

        let idUser = {
            _id: result[0]._id
        }

        if (result.length == 0) {
            return req.status(404).json({ message: 'User not found' })
        }


        bcrypt.compare(password, result[0].password).then(async function (status) {
            if (status) {
                // create access token
                let token = jwt.sign({ data }, 'linh', { expiresIn: "1h" });

                // create refresh token
                let refreshToken = jwt.sign({ data: idUser }, 'refresh_token', { expiresIn: '10d' });
                console.log('new: ', refreshToken);
                try {
                    let totalToken = await RefreshToken.find();

                    if (totalToken.length == 0) {
                        let newToken = await RefreshToken.create({ refreshToken });
                        res.json({
                            token,
                            refreshToken: newToken.refreshToken
                        });
                    } else {
                        let tokens = await RefreshToken.find();
                        let updateToken = await RefreshToken.findOneAndUpdate({ refreshToken: tokens[0].refreshToken }, { refreshToken }, {
                            new: true
                        })
                        res.json({
                            token,
                            refreshToken: updateToken.refreshToken
                        });
                    }
                } catch (e) {
                    res.send(e)
                }
            } else {
                res.json('Wrong password')
            }
        });

    }).catch(err => {
        console.log('fail');
    })
})

module.exports = router;