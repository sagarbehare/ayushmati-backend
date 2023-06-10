const express = require('express');
const Ward = require('../models/ward.model');

const router = express.Router();

// Routes // route.js
router.get('/listWardByHospital/:hospitalName', async (req, res) => {
  const hospitalName = req.params.hospitalName;

  console.log('hospitalName ::: ' + hospitalName);

  Ward.find({ hospitalName: hospitalName})
      .then((wards) => res.json(wards))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

module.exports = router;