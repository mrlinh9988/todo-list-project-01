const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-01', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = mongoose;