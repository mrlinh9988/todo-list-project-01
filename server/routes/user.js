const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const middlewareCheckLogin = require('../middlewares/checkLogin');
const client = require('../config/redisConnect');
const util = require('util');
// Biến hàm client.get thành trả về promise thay vì mặc định trả về callback
client.get = util.promisify(client.get);

router.get('/', async (req, res) => {

    const users = await User
        .find({})
        .cache('');

    res.send(users);

})

router.get('/:id', async (req, res) => {

    const user = await User
        .findById(req.params.id)
        .cache({ key: req.params.id });

    res.send(user)



    // Check have any cached data in redis related to this query
    // Kiểm tra xem trong cache redis đã có dữ liệu liên quan đến query này chưa
    // const cachedUser = await client.get(req.params.id);

    // // If yes then respond to the request and return 
    // if (cachedUser) {
    //     console.log('serving from redis cache');
    //     return res.send(JSON.parse(cachedUser));
    // }

    // // If no respond to request and update cache to store the data 

    // const id = req.params.id;
    // const user = await User.findById(id);
    // console.log(user);

    // res.send(user);

    // client.set(user._id, JSON.stringify(user))

})


// Tạo 1 custom query 

// const query = Person
//     .find({ occupation: /host/ })
//     .where('name.last').equals('Ghost')
//     .where('age').gt(17).lt(66)
//     .where('likes').in(['vaporizing', 'talking'])
//     .limit(10)
//     .sort('-occupation')
//     .select('name occupation');

// // Để thực thi câu lệnh query
// query.exec((err, result) => console.log(result))
// // Tương tự câu lệnh
// query.then(result => console.log(result))
// // Cũng tương tự với
// const result = await query;




// set expire time cho 1 key 
// client.set('key', 'value', 'EX', 5)

module.exports = router;


