const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { STATUS_ACTIVE, STATUS_IN_ACTIVE } = require('../utils/constant.js');


require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


// Routes
router.post('/signup', async (req, res) => {

  console.log('signup called...')
  try {
    const { hospitalName, docID_empID, role, firstName, lastName, emailID, password } = req.body;
    const status = STATUS_ACTIVE;

    const oldUser = await User.findOne({ emailID });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed PSW ::: "+ hashedPassword);
    console.log(emailID)
    console.log(password)

    // Create a new user
    const newUser = new User({ hospitalName, docID_empID, role, firstName, lastName, emailID, status, password:hashedPassword});
    
    newUser.save()
    .then(() => res.status(201).json({ message: 'User registered successfully' }))
    .catch((error) => res.status(500).json({ error: 'Internal server error1' }));

  } catch (error) {
    res.status(500).json({ error: 'Internal server error2' });
  }
});

// Login and generate a JWT token
router.post('/login', async (req, res) => {
  console.log('login called...')
  try {
    const { emailID, password } = req.body;

    console.log(emailID)
    console.log(password)

    // Find the user in the database
    const user = await User.findOne({ emailID });

    console.log(user)

    // If the user is not found or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const tokenData = {emailID:emailID,hospitalName:user.hospitalName}

    const token = generateToken(tokenData);
    
     const tempUser = {...user}
     delete tempUser._doc.password
    console.log(tempUser._doc.password)

    res.json({user:tempUser._doc, token:token});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateToken(tokenData) {
  const token = jwt.sign({tokenData}, secretKey, {
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