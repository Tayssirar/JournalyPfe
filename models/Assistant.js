const mongoose = require('mongoose');

const AssistantSchema = new mongoose.Schema({
  profile: { type: String, required: true },
  name: { type: String, required: true },
  region: { type: String, required: true },
  sexe: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Assistant', AssistantSchema);
