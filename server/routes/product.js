var express = require('express');
var router = express.Router();
var db = require('../model/dbConfig');
var d = new Date();
var date = d.toLocaleDateString().split('/');
var newDate = [date[1], date[0], date[2]];
var middlewareLogin = require('../middlewares/checkLogin');

// router.use(middlewareLogin.checkLogin)

router.get('/', (req, res, next) => {
    var page = parseInt(req.query.page);
    var start = (page - 1) * 10;
    db.find()
        .skip(start)
        .limit(10)
        .exec()
        .then(data => {
            // console.log(data);
            res.json(data)
        }).catch(err => {
            console.log(err);
        })
})

router.get('/:id', (req, res, next) => {

    let id = req.params.id;
    console.log(id);
    db.findById(id)
        .then(data => {
            console.log(data);
            res.json(data)
        }).catch(err => {
            console.log(err);
        })
})

router.get('/get/count', (req, res, next) => {
    db.find()
        .estimatedDocumentCount()
        .then(total => {

            res.json(total)
        }).catch(err => {
            console.log(err);
        })
})

router.post('/', middlewareLogin.checkLogin, (req, res, next) => {
    if (res.locals.type === 1 || res.locals.type === 3) {
        let title = req.body.title;
        db.create({
            title: title,
            createdAt: d.toLocaleTimeString() + ' ' + newDate.join('/')
        })
            .then(data => {
                console.log(data);
                db.find({
                    _id: data._id
                }).then(result => {
                    res.json({
                        message: 'Add data success',
                        data: result
                    })
                })

            }).catch(err => {
                console.log(err);
            })
    } else {
        res.json({
            status: 'can not add',
            message: 'Guest can not add record'
        })
    }
})

router.put('/:id', middlewareLogin.checkLogin, (req, res, next) => {
    console.log('res.locals: ', res.locals);
    if (res.locals.type === 1) {
        let id = req.params.id;
        let title = req.body.title;
        db.findByIdAndUpdate(
            id,
            {
                title: title
            }
        )
            .then(() => {
                db.findById(id).then(result => {
                    res.json({
                        message: 'Update success',
                        data: result
                    })
                })

            }).catch(err => {
                console.log(err);
            })
    } else if (res.locals.type === 3) {
        res.json({
            status: 'can not edit',
            message: 'Nomal user can not edit this record'
        })
    } else {
        res.json({
            status: 'can not edit',
            message: 'Guest can not edit this record'
        })
    }

})

router.delete('/:id', middlewareLogin.checkLogin, (req, res, next) => {
    console.log(res.locals);
    if (res.locals.type === 1) {
        let id = req.params.id;
        console.log(id);
        db.deleteOne({
            _id: id
        }).then(data => {
            res.json({
                message: 'Delete success'
            })
        }).catch(err => {
            console.log(err);
        })
    } else if (res.locals.type === 3) {
        res.json({
            status: 'can not delete',
            message: 'Nomal user can not edit this record'
        })
    } else if (res.locals.type === 0) {
        res.json({
            status: 'can not delete',
            message: 'Guest can not edit this record'
        })
    }

})


module.exports = router;
