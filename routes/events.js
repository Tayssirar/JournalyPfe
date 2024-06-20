const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/add', async (req, res) => {
  const { title, eventType, startDate, endDate, details } = req.body;

  try {
    const newEvent = new Event({
      title,
      eventType,
      startDate,
      endDate,
      details
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an event
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, eventType, startDate, endDate, details } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      title,
      eventType,
      startDate,
      endDate,
      details
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    (res.status500).json({ message: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
