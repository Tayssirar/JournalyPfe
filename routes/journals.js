const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// Get all journals
router.get('/all', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a journal by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const journal = await Journal.findById(id);
    
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new journal
router.post('/add', async (req, res) => {
  const { classe, theme, subTheme, education_a, journee, date, time1, time2, sections } = req.body;

  try {
    const newJournal = new Journal({
      classe,
      theme,
      subTheme,
      education_a,
      journee,
      date,
      time1,
      time2,
      sections
    });

    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a journal
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { classe, theme, subTheme, education_a, journee, date, time1, time2, sections } = req.body;

  try {
    const updatedJournal = await Journal.findByIdAndUpdate(id, {
      classe,
      theme,
      subTheme,
      education_a,
      journee,
      date,
      time1,
      time2,
      sections
    }, { new: true });

    if (!updatedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a journal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
