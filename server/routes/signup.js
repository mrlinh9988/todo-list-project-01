const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');

router.get('/', (req, res, next) => {

})

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    UserModel.create({
        username: username,
        password: password
    }).then(data => {
        console.log('Create success!');
    }).catch(err => {
        console.log(err);
    })
})


module.exports = router;