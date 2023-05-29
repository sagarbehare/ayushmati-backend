const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientName: String,
    mrn: String,
    dateOfBirth: Date,
    sex: String,
    maritalStatus: String,
    contactNo: Number,
    emergContactNo: Number,
    country: String,
    state: String,
    city: String,
    address: String,
    pincode: Number,
    primaryDoctor: String,
    weight: Number,
    height: Number,
    bloodGrp: String,
    symtoms: String,
    disease: String,
    ward: String,
    room: String,
    bed: String,
    admissionDate: Date,
    dischargeDate: Date,
    status: String
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;