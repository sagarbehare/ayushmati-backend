// MongoDB connection
const mongoose = require('mongoose');

require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const atlasURL = process.env.ATLAS_URL

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`, {
      // await mongoose.connect(atlasURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the application on connection error
  }
};

module.exports = connectDB;
