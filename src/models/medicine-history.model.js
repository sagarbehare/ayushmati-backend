const mongoose = require('mongoose');

const medicineHistorySchema = new mongoose.Schema({
    patientID: String,
    type: String,
    medicineName: String,
    inTakeDate: Date,
    doctorInstructions: String,
    status: String
});

const MedicineHistory = mongoose.model('medicine_history', medicineHistorySchema);
module.exports = MedicineHistory;