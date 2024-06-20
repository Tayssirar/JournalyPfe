const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Headmaster = require('../models/Headmaster');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const headmaster = await Headmaster.findOne({ email });
        if (!headmaster) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, headmaster.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = { headmasterId: headmaster.id };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, headmaster });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.headmaster = decoded.headmasterId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { router, auth };
