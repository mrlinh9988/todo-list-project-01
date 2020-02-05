const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    refreshToken: String
}, { collection: 'token' })

const tokenModel = mongoose.model('token', tokenSchema);

module.exports = tokenModel;