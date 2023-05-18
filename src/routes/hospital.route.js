const express = require('express');
const Hospital = require('../models/hospital.model');
const router = express.Router();

// Routes // route.js
router.get('/hospitals', async (req, res) => {
    Hospital.find({})
    .then((hospitals) => res.json(hospitals))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

router.post('/hospitals', async (req, res) => {
  const { hospitalName, email } = req.body;

  const newHospital = new Hospital({ hospitalName, email });

  newHospital.save()
    .then(() => res.json({ message: 'Hospital created successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

module.exports = router;




/*
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  User.findByIdAndUpdate(id, { name, email })
    .then(() => res.json({ message: 'User updated successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});
*/