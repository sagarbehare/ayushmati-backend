const express = require("express");
const User = require("../models/user.model");
const Ward = require("../models/ward.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { STATUS_ACTIVE, STATUS_IN_ACTIVE } = require("../utils/constant.js");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// Routes
router.post("/signup", async (req, res) => {
  console.log("signup called...");
  try {
    const {
      hospitalName,
      docID_empID,
      role,
      firstName,
      lastName,
      emailID,
      password,
      country,
      state,
      city,
      pincode,
      wardName
    } = req.body;
    const status = STATUS_ACTIVE;

    const oldUser = await User.findOne({ emailID });
    console.log(oldUser);

    if(oldUser != null) {
      console.log('old user exists...');
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed PSW ::: " + hashedPassword);
    console.log(emailID);
    console.log(password);

    // Create a new user
    const newUser = new User({
      hospitalName,
      docID_empID,
      role,
      firstName,
      lastName,
      emailID,
      status,
      password: hashedPassword,
      country,
      state,
      city,
      pincode
    });

    newUser
      .save()
      .then(() => {
        console.log('nurse saved...'+role);
        if(role === 'Nurse') { // Map with Wards
          console.log('find wards..');

          Ward.findOne({ 
            $and: [
              { hospitalName: hospitalName },     // Condition 1: age is greater than or equal to 18
              { wardName: wardName }         // Condition 2: isActive is true
            ]
          })
          .then(async (ward) =>  {
            const nurses = ward.nurses;
            console.log('nurses...' + nurses);
            nurses.push({nurseID: emailID});
            ward.save();
          })
          .catch((error) => res.status(500).json({ error: 'Internal server error' }));
        }
        
        // route...

        res.status(201).json({ message: "User registered successfully" })
      })
      .catch((error) =>
        res.status(500).json({ error: "Internal server error1" })
      );
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
});

// Login and generate a JWT token
router.post("/login", async (req, res) => {
  console.log("login called...");
  try {
    const { emailID, password } = req.body;

    console.log(emailID);
    console.log(password);

    // Find the user in the database
    const user = await User.findOne({ emailID });

    console.log(user);

    // If the user is not found or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const tokenData = {
      userID : user._id,
      emailID: emailID,
      hospitalName: user.hospitalName,
      name: user.firstName,
      role: user.role,
    };

    const token = generateToken(tokenData);

    const tempUser = { ...user };
    delete tempUser._doc.password;
    console.log(tempUser._doc.password);

    res.json({ user: tempUser._doc, token: token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

function generateToken(tokenData) {
  const token = jwt.sign({ tokenData }, secretKey, {
    expiresIn: "1h",
  });
  return token;
}

// logout
router.post("/logout", (req, res) => {
  // clear token cookie
  res.clearCookie("token");
  res.end();
});

module.exports = router;
