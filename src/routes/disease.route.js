const express = require('express');
const Disease = require('../models/disease.model');
const router = express.Router();


//save
router.post('/createDisease', async (req, res) => {
  try {
    const { diseaseName } = req.body;
    
    // Create a new user
    const newDisease = new Disease({ diseaseName });
    
    newDisease.save()
    .then(() => res.status(201).json({ message: 'Disease registered successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Routes // route.js
router.get('/listDisease', async (req, res) => {
  Disease.find({})
    .then((disease) => res.json(disease))
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