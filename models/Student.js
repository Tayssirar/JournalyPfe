const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: false
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
