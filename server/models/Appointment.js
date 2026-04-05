const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date:   { type: String, required: true }, // "YYYY-MM-DD"
  time:   { type: String, required: true }, // "HH:MM"
  reason: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
