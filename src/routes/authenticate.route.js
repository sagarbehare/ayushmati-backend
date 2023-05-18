const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Routes
router.post('/signup', async (req, res) => {
  try {
    const { loginID, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed PSW ::: "+ hashedPassword);

    // Create a new user
    const newUser = new User({ loginID, password: hashedPassword });
    
    newUser.save()
    .then(() => res.status(201).json({ message: 'User registered successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login and generate a JWT token
router.post('/login', async (req, res) => {
  console.log('login called...');
  try {
    const { loginID, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ loginID });

    // If the user is not found or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = generateToken(loginID);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateToken(loginID) {
  const token = jwt.sign({loginID}, `${secretKey}`, {
    expiresIn: '1h'
  });
  return token;
}

// logout
router.post('/logout', (req, res) => {
  // clear token cookie
  res.clearCookie('token');
  res.end();
});


module.exports = router;