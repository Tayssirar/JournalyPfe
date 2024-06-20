const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Class = require('../models/Class');

// Load environment variables from .env file
dotenv.config();

const classes = [
  { name: '1ere annee', description: 'Première année' },
  { name: '2eme annee', description: 'Deuxième année' },
  { name: '3eme annee', description: 'Troisième année' },
  { name: '4eme annee', description: 'Quatrième année' },
  { name: '5eme annee', description: 'Cinquième année' },
  { name: '6eme annee', description: 'Sixième année' },
];

const addClasses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Class.insertMany(classes);
    console.log('Classes added successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding classes:', error);
    mongoose.disconnect();
  }
};

addClasses();
