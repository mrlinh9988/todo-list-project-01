const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test-01', { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
}, {
    collection: 'user'
});


var User = mongoose.model('user', UserSchema);

// User.create({
//     username: 'linh1',
//     password: '123'
// }).then(data => {
//     console.log('Create success');
// })

function auth(username, password) {
    return User.find({
        $and : [{ username: username }, { password: password }]
    });
}


module.exports = {
    auth
}