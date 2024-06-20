const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Module = require('./models/Module');

// MongoDB connection logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const importData = async () => {
  await connectDB();

  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'modulesData.json'), 'utf-8'));
    await Module.deleteMany(); // Clear existing data
    await Module.insertMany(data.modules);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
