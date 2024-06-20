const express = require('express');
const router = express.Router();
const School = require('../models/School');

// Get all schools
router.get('/', async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).send(schools);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single school by ID
router.get('/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res.status(404).send('School not found');
        }
        res.status(200).send(school);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a new school
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Log request body to ensure it's received correctly
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).send(school);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Email already exists.');
        } else {
            console.error('Error saving school:', error); // Log any errors
            res.status(500).send('Internal Server Error');
        }
    }
});

// Update a school
router.put('/:id', async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!school) {
            return res.status(404).send('School not found');
        }
        res.status(200).send(school);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a school
router.delete('/:id', async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        if (!school) {
            return res.status(404).send('School not found');
        }
        res.status(200).send('School deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
