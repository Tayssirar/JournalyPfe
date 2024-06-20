const express = require('express');
const router = express.Router();
const Assistant = require('../models/Assistant');

// Get all assistants
router.get('/all', async (req, res) => {
  try {
    const assistants = await Assistant.find();
    res.status(200).json(assistants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an assistant by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const assistant = await Assistant.findById(id);
    
    if (!assistant) {
      return res.status(404).json({ message: 'Assistant not found' });
    }
    
    res.status(200).json(assistant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new assistant
router.post('/add', async (req, res) => {
  const { profile, name, region, sexe, mobile, email } = req.body;

  try {
    const newAssistant = new Assistant({
      profile,
      name,
      region,
      sexe,
      mobile,
      email
    });

    const savedAssistant = await newAssistant.save();
    res.status(201).json(savedAssistant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an assistant
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { profile, name, region, sexe, mobile, email } = req.body;

  try {
    const updatedAssistant = await Assistant.findByIdAndUpdate(id, {
      profile,
      name,
      region,
      sexe,
      mobile,
      email
    }, { new: true });

    if (!updatedAssistant) {
      return res.status(404).json({ message: 'Assistant not found' });
    }

    res.status(200).json(updatedAssistant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an assistant
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAssistant = await Assistant.findByIdAndDelete(id);

    if (!deletedAssistant) {
      return res.status(404).json({ message: 'Assistant not found' });
    }

    res.status(200).json({ message: 'Assistant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
