const mongoose = require('mongoose');

const medicineIntakeSchema = new mongoose.Schema({
    patientID: String,
    primaryNurse: String,
    medicinetype: String,
    medicineName: String,
    intakeDateTime:Date,
    doctorInstructions: String,
    status: String,
    
});

const medicineIntake = mongoose.model('medicineIntake', medicineIntakeSchema);
module.exports = medicineIntake;