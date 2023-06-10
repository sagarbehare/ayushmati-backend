const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    hospitalName: String,
    docID_empID: String,
    role: String,
    firstName: String,
    lastName: String,
    emailID: String,
    password: String,
    country: String,
    state: String,
    city: String,
    pincode: String,
    status: String
});


const User = mongoose.model('user', userSchema);

module.exports = User;