const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    schoolType: {
        type: String,
        required: true
    },
    establishedDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
