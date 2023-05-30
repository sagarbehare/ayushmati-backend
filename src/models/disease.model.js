const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    diseaseName: String,
    diseaseDescription: String
});

const Disease = mongoose.model('disease', diseaseSchema);

module.exports = Disease;