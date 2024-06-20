const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
  student: { type: String, required: true },
  description: { type: String, required: true },
  criterea: { type: String, required: true },
  source: { type: String, required: true },
  remediation: { type: String, required: true }
});

module.exports = mongoose.model('Error', ErrorSchema);
