const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: String,
    state: String,
    city: String,
    address: String,
    pincode: Number
});

const clinicalSchema = new mongoose.Schema({
    primaryDoctor: String,
    weight: Number,
    height: Number,
    bloodGrp: String,
    symtoms: Number,
    disease: String,
    ward: String,
    room: String,
    bed: String
});

const patientSchema = new mongoose.Schema({
    patientName: String,
    dateOfBirth: Date,
    sex: String,
    contactNo: Number,
    emrgContactNo: Number,
    maritalStatus: String,
    address: [addressSchema],
    clinicalInfo: [clinicalSchema]
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;