const express = require('express');
const Patient = require('../models/patient.model');
const router = express.Router();

// Routes // route.js
router.get('/listPatient', async (req, res) => {
  Patient.find({})
    .then((patient) => res.json(patient))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

router.post('/createPatient', async (req, res) => {
  const { patientName, dateOfBirth, address, clinicalInfo } = req.body;

  const newPatient = new Patient({ patientName, dateOfBirth, address, clinicalInfo });

  newPatient.save()
    .then(() => res.json({ message: 'Patient created successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

module.exports = router;
