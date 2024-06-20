const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  genre: { type: String, required: true },
  region: { type: String, required: true },
  diplome: { type: String, required: true },
  niveaux: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  dateNomination: { type: Date, required: true },
  password: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
