const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: String,
    state: String,
    city: String,
    address: String,
    pincode: Number
});

const userSchema = new mongoose.Schema({
    hospitalName: String,
    docID_empID: String,
    role: String,
    firstName: String,
    lastName: String,
    emailID: String,
    password: String,
    status: String,
});


const User = mongoose.model('user', userSchema);

module.exports = User;