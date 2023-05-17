const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    email: String
});

const Hospital = mongoose.model('hospitals', hospitalSchema);

module.exports = Hospital;