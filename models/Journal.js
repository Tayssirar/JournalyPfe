const mongoose = require('mongoose');

const JournalSectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: {
    Duré: { type: String },
    contenu: { type: String },
    Les_objectifs_spécifiques: { type: String },
    Les_objectifs_de_la_séance: { type: String },
    Les_supports: { type: String },
    Les_étapes: { type: String },
    La_compétence_de_vie: { type: String },
    Observation: { type: String },
  },
});

const JournalSchema = new mongoose.Schema({
  classe: { type: String, required: true },
  subTheme: { type: String, required: true },
  education_a: { type: String, required: true },
  journee: { type: String, required: true },
  date: { type: Date, required: true },
  time1: { type: String, required: true },
  time2: { type: String, required: true },
  sections: [JournalSectionSchema],
});

module.exports = mongoose.model('Journal', JournalSchema);
