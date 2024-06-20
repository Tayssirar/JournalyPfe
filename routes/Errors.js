const express = require('express');
const router = express.Router();
const Error = require('../models/Error');

// GET /api/errors
router.get('/', async (req, res) => {
  try {
    const errors = await Error.find();
    res.json(errors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/errors/:id
router.get('/:id', async (req, res) => {
  try {
    const error = await Error.findById(req.params.id);
    if (!error) return res.status(404).json({ message: 'Error not found' });
    res.json(error);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/errors
router.post('/', async (req, res) => {
  const { student, description, criterea, source, remediation } = req.body;

  const newError = new Error({
    student,
    description,
    criterea,
    source,
    remediation
  });

  try {
    const savedError = await newError.save();
    res.status(201).json(savedError);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/errors/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedError = await Error.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedError) return res.status(404).json({ message: 'Error not found' });
    res.json(updatedError);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/errors/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedError = await Error.findByIdAndDelete(req.params.id);
    if (!deletedError) return res.status(404).json({ message: 'Error not found' });
    res.json({ message: 'Error deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
