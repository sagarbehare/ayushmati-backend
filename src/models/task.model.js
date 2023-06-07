const mongoose = require("mongoose");

const medicineIntakeSchema = new mongoose.Schema({
  patientID: String,
  primaryNurse: String,
  medicineType: String,
  medicineName: String,
  inTakeTime: Date,
  doctorInstructions: String,
  status: String,
});

const medicineIntake = mongoose.model("medicineIntake", medicineIntakeSchema);
module.exports = medicineIntake;
