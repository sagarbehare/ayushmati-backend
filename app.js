// server.js
const express = require("express");
const connectDB = require("./src/config/db.connection");
const jwt = require("jsonwebtoken");
const hospitalRoutes = require("./src/routes/hospital.js");
const authenticateRoutes = require("./src/routes/authenticate.js");
const patientRegistrationRoutes = require("./src/routes/patient.js");
const router = require("./src/routes/hospital.js");
const cors = require('cors');


const app = express();
require("dotenv").config();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

console.log("hi");


// Routes
app.use("/registration", validateUser, hospitalRoutes);
app.use("/authenticate", authenticateRoutes);
app.use("/patientRegistration", patientRegistrationRoutes);

// check token is expired or not
function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    `${secretKey}`,
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
