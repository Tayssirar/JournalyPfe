const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: {
    contenu: { type: String, required: true },
    supports: { type: String },
  },
});

const JourneeSchema = new mongoose.Schema({
  sections: [SectionSchema],
});

const ModuleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  journées: { type: Map, of: JourneeSchema },
});

module.exports = mongoose.model('Module', ModuleSchema);
