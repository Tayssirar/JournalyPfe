const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// GET /api/exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/exams/:id
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/exams
router.post('/', async (req, res) => {
  const { classe, groupe, evaluationType, title, date, content } = req.body;

  const newExam = new Exam({
    classe,
    groupe,
    evaluationType,
    title,
    date,
    content
  });

  try {
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/exams/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedExam) return res.status(404).json({ message: 'Exam not found' });
    res.json(updatedExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/exams/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
