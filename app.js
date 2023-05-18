// server.js
const express = require('express');
const connectDB = require('./src/config/db.connection');
const jwt = require('jsonwebtoken');
const hospitalRoutes = require('./src/routes/hospital.route');
const authenticateRoutes = require('./src/routes/authenticate.route');


const app = express();
require('dotenv').config();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/registration', validateUser, hospitalRoutes);
app.use('/authenticate', authenticateRoutes);


// check token is expired or not
function validateUser(req, res, next) {

console.log();

  jwt.verify(req.headers['x-access-token'], `${secretKey}`, function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});