const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');
var isLogin = false;
var port = process.env.PORT || 3000;

server.use('/public', express.static(path.join(__dirname, '/public')))
server.use(express.urlencoded({ extended: true }))

server.use((err, req, res, next) => {
    res.json({
        message: 'Can\'t not access private'
    })
})

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
})

server.get('/', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/index.html'))

})

server.get('/services', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/services.html'))

})

server.get('/features', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/features.html'))

})

server.get('/portfolio', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/portfolio.html'))

})

server.get('/contact', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/contact.html'))

})

server.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/html/login.html'))
})

// login logic
server.post('/login', (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === '12345') {
        isLogin = true;
        // res.json({
        //     status: 200,
        //     message: 'ĐĂNG NHẬP THÀNH CÔNG'
        // })
        // console.log('Dang nhap thanh cong');
        res.redirect('/')
    } else {
        isLogin = false;
        // res.json({
        //     status: 400,
        //     message: 'ĐĂNG NHẬP THẤT BẠI'
        // })
        res.redirect('login')
        // console.log('Dang nhap that bai');
    }
})

server.get('/private', (req, res, next) => {
    if (isLogin) {
        next()
    } else {
        next('err')
    }
}, (req, res, next) => {
    res.json({
        private: 'Nguyen Hai Linh dep trai'
    })
})

server.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/html/home.html'))
})

server.listen(port, () => {
    console.log('server on port ', port);
})