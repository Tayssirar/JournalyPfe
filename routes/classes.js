const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Get all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single class by ID
router.get('/:id', async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) {
            return res.status(404).send('Class not found');
        }
        res.status(200).send(cls);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a new class
router.post('/', async (req, res) => {
    try {
        const cls = new Class(req.body);
        await cls.save();
        res.status(201).send(cls);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Class already exists.');
        } else {
            console.error('Error saving class:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Update a class
router.put('/:id', async (req, res) => {
    try {
        const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cls) {
            return res.status(404).send('Class not found');
        }
        res.status(200).send(cls);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a class
router.delete('/:id', async (req, res) => {
    try {
        const cls = await Class.findByIdAndDelete(req.params.id);
        if (!cls) {
            return res.status(404).send('Class not found');
        }
        res.status(200).send('Class deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
