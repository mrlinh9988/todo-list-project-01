var express = require('express');
var router = express.Router();
var db = require('../model/dbConfig');
var d = new Date();
var date = d.toLocaleDateString().split('/');
var newDate = [date[1], date[0], date[2]];


router.get('/', (req, res, next) => {
    var page = parseInt(req.query.page);
    var start = (page - 1) * 10;
    db.find()
        .skip(start)
        .limit(15)
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

router.post('/', (req, res, next) => {
    let title = req.body.title;
    db.create({
        title: title,
        createdAt: d.toLocaleTimeString() + ' ' + newDate.join('/')
    })
        .then(data => {
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
})

router.put('/:id', (req, res, next) => {
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
})

router.delete('/:id', (req, res, next) => {
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
})


module.exports = router;
