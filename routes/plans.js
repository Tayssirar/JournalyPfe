const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// GET /api/plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/plans/:id
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/plans
router.post('/', async (req, res) => {
  const { classe, subTheme, education_a, journées } = req.body;

  const newPlan = new Plan({
    classe,
    subTheme,
    education_a,
    journées
  });

  try {
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/plans/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/plans/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
