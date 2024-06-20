const express = require('express');
const router = express.Router();
const Inspector = require('../models/Inspector');

// Get all inspectors
router.get('/all', async (req, res) => {
  try {
    const inspectors = await Inspector.find();
    res.status(200).json(inspectors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an inspector by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const inspector = await Inspector.findById(id);
    
    if (!inspector) {
      return res.status(404).json({ message: 'Inspector not found' });
    }
    
    res.status(200).json(inspector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new inspector
router.post('/add', async (req, res) => {
  const { profile, name, region, sexe, mobile, email } = req.body;

  try {
    const newInspector = new Inspector({
      profile,
      name,
      region,
      sexe,
      mobile,
      email
    });

    const savedInspector = await newInspector.save();
    res.status(201).json(savedInspector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an inspector
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { profile, name, region, sexe, mobile, email } = req.body;

  try {
    const updatedInspector = await Inspector.findByIdAndUpdate(id, {
      profile,
      name,
      region,
      sexe,
      mobile,
      email
    }, { new: true });

    if (!updatedInspector) {
      return res.status(404).json({ message: 'Inspector not found' });
    }

    res.status(200).json(updatedInspector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an inspector
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInspector = await Inspector.findByIdAndDelete(id);

    if (!deletedInspector) {
      return res.status(404).json({ message: 'Inspector not found' });
    }

    res.status(200).json({ message: 'Inspector deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
