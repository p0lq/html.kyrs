const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  specialty:  { type: String, required: true },
  experience: { type: String, default: '' },
  photo:      { type: String, default: '👨‍⚕️' },
  bio:        { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
