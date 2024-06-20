const mongoose = require('mongoose');

const CriterionSchema = new mongoose.Schema({
  C1: { type: Number, required: true },
  C2: { type: Number, required: true },
  C3: { type: Number, required: true },
  C4: { type: Number, required: true },
  C5: { type: Number, required: true },
  C6: { type: Number, required: true },
  C7: { type: Number }
});

const NoteSchema = new mongoose.Schema({
  classe: { type: String, required: true },
  groupe: { type: String, required: true },
  evaluationType: { type: String, required: true },
  noteType: { type: String, required: true },
  student: { type: String, required: true },
  recitation: { type: CriterionSchema, required: true },
  oral: { type: CriterionSchema, required: true },
  lecture: { type: CriterionSchema, required: true },
  ecrit: { type: CriterionSchema, required: true },
  total: { type: Number }
});

module.exports = mongoose.model('Note', NoteSchema);
