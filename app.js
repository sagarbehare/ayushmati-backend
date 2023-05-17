// server.js
const express = require('express');
const connectDB = require('./src/config/db.connection'); // Adjust the path based on your file structure
const hospitalRoutes = require('./src/routes/hospital.route'); // Adjust the path based on your file structure

const app = express();
require('dotenv').config();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', hospitalRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});