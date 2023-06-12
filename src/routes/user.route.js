const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

// Routes // route.js
// router.get('/listActiveDoctor', async (req, res) => {
//   User.find({
//     $and: [
//       { role: 'Doctor' },
//       { status: 'ACTIVE' }
//     ]
//   })
//     .then((users) => res.json(users))
//     .catch((error) => res.status(500).json({ error: 'Internal server error' }));
// });

router.get("/listActiveDoctor/:hospitalName", async (req, res) => {
  const { hospitalName } = req.params;

  console.log("active doctor for hosp : " + hospitalName);

  User.find({
    $and: [
      { role: "Doctor" },

      { status: "ACTIVE" },

      { hospitalName: hospitalName },
    ],
  })

    .then((users) => res.json(users))

    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

router.get("/listActiveNurse/:hospitalName", async (req, res) => {
  const { hospitalName } = req.params;
  User.find({
    $and: [
      { role: "Nurse" },
      { status: "ACTIVE" },
      { hospitalName: hospitalName }
    ],
  })
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
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
