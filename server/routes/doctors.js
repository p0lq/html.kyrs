const router = require('express').Router();
const Doctor = require('../models/Doctor');

// Авто-сид врачей
async function seedDoctors() {
  try {
    const count = await Doctor.countDocuments();
    if (count > 0) return;
    await Doctor.insertMany([
      { name: 'Иванова Анна Сергеевна', specialty: 'Терапевт', experience: '12 лет', photo: '👩‍⚕️', bio: '' },
      { name: 'Петров Дмитрий Олегович', specialty: 'Кардиолог', experience: '8 лет', photo: '👨‍⚕️', bio: '' },
      { name: 'Сидорова Елена Павловна', specialty: 'Невролог', experience: '15 лет', photo: '👩‍⚕️', bio: '' },
      { name: 'Козлов Артём Игоревич', specialty: 'Хирург', experience: '20 лет', photo: '👨‍⚕️', bio: '' },
      { name: 'Морозова Татьяна Юрьевна', specialty: 'Педиатр', experience: '10 лет', photo: '👩‍⚕️', bio: '' },
      { name: 'Захаров Игорь Витальевич', specialty: 'Офтальмолог', experience: '11 лет', photo: '👨‍⚕️', bio: '' },
      { name: 'Лебедева Ольга Николаевна', specialty: 'Дерматолог', experience: '9 лет', photo: '👩‍⚕️', bio: '' },
      { name: 'Федоров Максим Андреевич', specialty: 'Ортопед', experience: '14 лет', photo: '👨‍⚕️', bio: '' },
    ]);
    console.log('Doctors seeded');
  } catch(e) {
    console.error('Seed error:', e.message);
  }
}
seedDoctors();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Врач не найден' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
