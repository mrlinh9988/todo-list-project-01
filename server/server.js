const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');
// var isLogin = false;
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser')
var productRoute = require('./routes/product');
var loginRoute = require('./routes/signin')
var jwt = require('jsonwebtoken');
var logInMiddleware = require('./middlewares/checkLogin')
var signupRoute = require('./routes/signup');
var logoutRoute = require('./routes/logout');
var refreshTokenRoute = require('./routes/refresh');
var forgetPasswordRoute = require('./routes/forgetPassword');
var cors = require('cors');

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(cookieParser())
server.use('/public', express.static(path.join(__dirname, '/public')))
server.use(express.urlencoded({ extended: true }))

server.use('/api/product', productRoute);
server.use('/signup', signupRoute);
server.use('/logout', logoutRoute);
server.use('/refreshToken', refreshTokenRoute);
server.use('/forget', forgetPasswordRoute);


server.use((err, req, res, next) => {
    res.json({
        message: 'Can\'t not access private'
    })
})


server.use('/signin', loginRoute)
server.use(cors())
// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
//     next();
// })



server.get('/', logInMiddleware.checkLogin, (req, res, next) => {
    res.render('index', { type: res.locals, a: 'linh' })
})



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