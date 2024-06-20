const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('school').populate('classes');
    res.status(200).send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('school').populate('classes');
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.status(200).send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    console.error('Error saving teacher:', error); // Improved error logging
    if (error.code === 11000) {
      res.status(400).send('Email already exists.');
    } else {
      res.status(500).send(error);
    }
  }
});

// Update a teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.status(200).send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.status(200).send('Teacher deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
