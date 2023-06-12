const express = require('express');
const Hospital = require('../models/hospital.model');
const Ward = require('../models/ward.model');

const router = express.Router();

// Routes // route.js
router.get('/listHospital', async (req, res) => {
  console.log("hi from list")
    Hospital.find({})
    .then((hospitals) => res.json(hospitals))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});

router.post('/createHospital', async (req, res) => {
  const { hospitalName, email } = req.body;
  
  console.log('hospitalName ::: ' + hospitalName);

  Hospital.find({ hospitalName: hospitalName})
  .then((hospital) =>  {
    console.log('existHospital ::: ' + hospital.hospitalName);
    
    if(Object.keys(hospital).length > 0 ) {
      res.status(409).json({ message: 'Hospital Already Present !' });
    } else {
      const newHospital =  new Hospital({ hospitalName, email });
      newHospital.save()
        .then(async () => {
          await createDefaultWard(hospitalName);

          res.json({ message: 'Hospital created successfully' })
        })
        .catch((error) => res.status(500).json({ error: 'Internal server error' }));
    }
  })
  .catch((error) => res.status(500).json({ error: 'Internal server error' }));
 });

async function createDefaultWard(hospitalName) {
  const beds = [
    {  bedNo: 'B 1'},
    {  bedNo: 'B 2'},
    {  bedNo: 'B 3'},
    {  bedNo: 'B 4'},
    {  bedNo: 'B 5'},
  ]
  
  const rooms = [
    {  roomNo: 'Room 1' , beds: beds}
  ]
  
  const generalWard = new Ward({
    hospitalName: hospitalName,
    wardName: 'General Ward',
    rooms: rooms
  });
  
  await generalWard.save()
        .then(() => console.log('General Ward Created Successfully'))
        .catch((error) => res.status(500).json({ error: 'Internal server error' }));

  const icuWard = new Ward({
    hospitalName: hospitalName,
    wardName: 'ICU Ward',
    rooms: rooms
  });
  
  await icuWard.save()
        .then(() => console.log('ICU Ward Created Successfully'))
        .catch((error) => res.status(500).json({ error: 'Internal server error' }));
    
}

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