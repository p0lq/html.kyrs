const router = require('express').Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('doctor', 'name specialty photo experience')
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    if (!doctor || !date || !time)
      return res.status(400).json({ message: 'Укажите врача, дату и время' });

    const conflict = await Appointment.findOne({ doctor, date, time, status: 'scheduled' });
    if (conflict) return res.status(400).json({ message: 'Это время уже занято' });

    const appointment = await Appointment.create({ user: req.user.id, doctor, date, time, reason });
    await appointment.populate('doctor', 'name specialty photo experience');
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user.id });
    if (!appointment) return res.status(404).json({ message: 'Запись не найдена' });

    const { date, time, reason } = req.body;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (reason !== undefined) appointment.reason = reason;
    await appointment.save();
    await appointment.populate('doctor', 'name specialty photo experience');
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user.id });
    if (!appointment) return res.status(404).json({ message: 'Запись не найдена' });
    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Запись отменена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
