const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    loginID: String,
    password: String
});


const User = mongoose.model('users', userSchema);

module.exports = User;