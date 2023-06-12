// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.connection");
const jwt = require("jsonwebtoken");
const hospitalRoutes = require("./src/routes/hospital.route");
const authenticateRoutes = require("./src/routes/authenticate.route");
const patientRegistrationRoutes = require("./src/routes/patient.route");
const users = require("./src/routes/user.route");
const disease = require("./src/routes/disease.route");
const task = require("./src/routes/task.route");
const ward = require("./src/routes/ward.route");

const app = express();

// 👇️ configure CORS
app.use(cors());

require("dotenv").config();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/registration", hospitalRoutes);
app.use("/authenticate", authenticateRoutes);
app.use("/patientRegistration", validateUser, patientRegistrationRoutes);
app.use("/user", users);
app.use("/disease", disease);
app.use("/patientTask", task);
app.use("/wardsDetails", ward);

// check token is expired or not
function validateUser(req, res, next) {
  const token = req.headers["x-access-token"];
  try {
    const data = jwt.verify(token, secretKey);
    console.log(data.tokenData);
    // req.body.userId = data.tokenDataData.id;
    req.body.emailID = data.tokenData.emailID;
    req.body.name = data.tokenData.name;
    req.body.hospitalName = data.tokenData.hospitalName;
    req.body.role = data.tokenData.role;
    console.log(data.tokenData.role);
    console.log(req.body.emailID);
    next();
  } catch (err) {
    res.json({ status: "error", message: err.message, data: null });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
