const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    nurseID: String
});

const bedSchema = new mongoose.Schema({
    bedNo: String
});

const roomSchema = new mongoose.Schema({
    roomNo: String,
    beds: [bedSchema]
});

const wardSchema = new mongoose.Schema({
    hospitalName: String,
    wardName: String,
    rooms: [roomSchema],
    nurses: [nurseSchema]
});

const Ward = mongoose.model('ward', wardSchema);

module.exports = Ward;