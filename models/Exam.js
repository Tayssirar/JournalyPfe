const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "text", "image", "question"
  data: { type: mongoose.Schema.Types.Mixed, required: true } // Flexible to hold different types of data
});

const ExamSchema = new mongoose.Schema({
  classe: { type: String, required: true },
  groupe: { type: String, required: true },
  evaluationType: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: [ContentSchema] // Array of content items
});

module.exports = mongoose.model('Exam', ExamSchema);
