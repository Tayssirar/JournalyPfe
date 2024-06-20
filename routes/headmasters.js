const express = require('express');
const router = express.Router();
const Headmaster = require('../models/Headmaster');

// Get all headmasters
router.get('/', async (req, res) => {
    try {
        const headmasters = await Headmaster.find().populate('school');
        res.status(200).send(headmasters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single headmaster by ID
router.get('/:id', async (req, res) => {
    try {
        const headmaster = await Headmaster.findById(req.params.id).populate('school');
        if (!headmaster) {
            return res.status(404).send('Headmaster not found');
        }
        res.status(200).send(headmaster);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a new headmaster
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Log request body to ensure it's received correctly
    try {
        const headmaster = new Headmaster(req.body);
        await headmaster.save();
        res.status(201).send(headmaster);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Email already exists.');
        } else {
            console.error('Error saving headmaster:', error); // Log any errors
            res.status(500).send('Internal Server Error');
        }
    }
});

// Update a headmaster
router.put('/:id', async (req, res) => {
    try {
        const headmaster = await Headmaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!headmaster) {
            return res.status(404).send('Headmaster not found');
        }
        res.status(200).send(headmaster);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a headmaster
router.delete('/:id', async (req, res) => {
    try {
        const headmaster = await Headmaster.findByIdAndDelete(req.params.id);
        if (!headmaster) {
            return res.status(404).send('Headmaster not found');
        }
        res.status(200).send('Headmaster deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
