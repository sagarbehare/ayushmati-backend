const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalRegNo: String,
  hospitalName: String,
  email: String,
  fax: String,
  contactNo: Number,
  country: String,
  state: String,
  city: String,
  pincode: String,
  address: String,
  password: String,
  planType: String,
});

const Hospital = mongoose.model("hospitals", hospitalSchema);

module.exports = Hospital;
