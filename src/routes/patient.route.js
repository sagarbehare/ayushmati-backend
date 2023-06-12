const express = require("express");
const Patient = require("../models/patient.model");
const router = express.Router();

const crypto = require("crypto");

// Routes // route.js
// router.get('/listPatient', async (req, res) => {
//   console.log("inside patient list")
//   try {
//     const { role ,name , hospitalName} = req.body;
//     console.log(req.body.role)

//    if(role==='Receptionist'){
//     Patient.find({})
//     .then((patient) => res.json(patient))
//     .catch((error) => res.status(500).json({ error: 'Internal server error' }));
//    }
//    else if (role==='Doctor'){
//     Patient.find({
//       primaryDoctor:name
//     })
//     .then((patient) => res.json(patient))
//     .catch((error) => res.status(500).json({ error: 'Internal server error' }));
//    }

//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }

// });

router.get("/listPatient/:hospitalName", async (req, res) => {

  
  console.log("inside patient list");

  const { hospitalName } = req.params;

  try {
    const { role, name } = req.body;

    console.log(req.body.role);

    if (role === "Receptionist") {
      Patient.find({ hospitalName: hospitalName })

        .then((patient) => res.json(patient))

        .catch((error) =>
          res.status(500).json({ error: "Internal server error" })
        );
    } else if (role === "Doctor") {
      Patient.find({
        primaryDoctor: name,
      })

        .then((patient) => res.json(patient))

        .catch((error) =>
          res.status(500).json({ error: "Internal server error" })
        );
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getPatient", async (req, res) => {
  Patient.find({ _id: "DOCTOR" })
    .then((patient) => res.json(patient))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

router.get("/getPatient/:patientID", async (req, res) => {
  const { patientID } = req.params;

  try {
    const patient = await Patient.findById(patientID);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/createPatient", async (req, res) => {
  const { newPatient } = req.body;

  console.log("saving called.." + newPatient);

  const patientName = newPatient.patientName;
  const dateOfBirth = newPatient.dateOfBirth;
  const sex = newPatient.sex;
  const maritalStatus = newPatient.maritalStatus;
  const contactNo = newPatient.contactNo;
  const emergContactNo = newPatient.emergContactNo;
  const country = newPatient.country;
  const state = newPatient.state;
  const city = newPatient.city;
  const pincode = newPatient.pincode;
  const address = newPatient.address;

  const primaryDoctor = newPatient.primaryDoctor;
  const weight = newPatient.weight;
  const height = newPatient.height;
  const bloodGrp = newPatient.bloodGrp;
  const symtoms = newPatient.symtoms;
  const disease = newPatient.disease;
  const ward = newPatient.ward;
  const room = newPatient.room;
  const bed = newPatient.bed;
  const admissionDate = newPatient.admissionDate;
  const hospitalName = newPatient.hospitalName;

  const mrn = generateMRN();
  const status = "ADMITTED";

  const patient = new Patient({
    patientName,
    dateOfBirth,
    sex,
    maritalStatus,
    contactNo,
    emergContactNo,
    country,
    state,
    city,
    pincode,
    address,
    primaryDoctor,
    weight,
    height,
    bloodGrp,
    symtoms,
    disease,
    ward,
    room,
    bed,
    admissionDate,
    mrn,
    status,
    hospitalName
  });

  try {
    await patient.save();
    console.log("savedPatient " + patient._id);
    res
      .status(201)
      .json({
        patientID: patient._id,
        message: "Patient created successfully",
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updatePatient/:patientID", async (req, res) => {
  console.log("update called....");
  const { patientID } = req.params;
  const { newPatient } = req.body;

  console.log(patientID);
  console.log(newPatient);

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: patientID },
      { $set: newPatient },
      { new: true }
    );
    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateMRN() {
  const length = 8; // MRN length
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Alphanumeric characters
  let mrn = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    mrn += characters[randomIndex];
  }

  return "MRN-" + mrn;
}

module.exports = router;
