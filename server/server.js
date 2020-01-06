const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');
// var isLogin = false;
var port = process.env.PORT || 3000;
var productRoute = require('./routes/product');
var loginRoute = require('./routes/login')

server.use('/public', express.static(path.join(__dirname, '/public')))
server.use(express.urlencoded({ extended: true }))

server.use('/api/product', productRoute);

server.use((err, req, res, next) => {
    res.json({
        message: 'Can\'t not access private'
    })
})


server.use('/login', loginRoute)

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
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


server.get('/', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/public/html/index2.html'))

})

// login logic


// server.get('/private', (req, res, next) => {
//     if (isLogin) {
//         next()
//     } else {
//         next('err')
//     }
// }, (req, res, next) => {
//     res.json({
//         private: 'Nguyen Hai Linh dep trai'
//     })
// })

// server.get('/home', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '/public/html/home.html'))
// })

server.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

server.listen(port, () => {
    console.log('server on port ', port);
})