const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('school'); // Populate school field
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('school'); // Populate school field
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new student
router.post('/', async (req, res) => {
  console.log('Request Body:', req.body); // Log request body to ensure it's received correctly
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    console.error('Error saving student:', error); // Log any errors
    res.status(400).send(error);
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
