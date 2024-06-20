const express = require('express');
const router = express.Router();
const Rapport = require('../models/Rapport');

// GET /api/rapports
router.get('/', async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.json(rapports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/rapports/:id
router.get('/:id', async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) return res.status(404).json({ message: 'Rapport not found' });
    res.json(rapport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/rapports
router.post('/', async (req, res) => {
  const rapportData = req.body;

  const newRapport = new Rapport(rapportData);

  try {
    const savedRapport = await newRapport.save();
    res.status(201).json(savedRapport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/rapports/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedRapport = await Rapport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRapport) return res.status(404).json({ message: 'Rapport not found' });
    res.json(updatedRapport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/rapports/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRapport = await Rapport.findByIdAndDelete(req.params.id);
    if (!deletedRapport) return res.status(404).json({ message: 'Rapport not found' });
    res.json({ message: 'Rapport deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
