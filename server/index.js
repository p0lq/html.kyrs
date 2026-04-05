require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use((req, res) => res.status(404).json({ message: 'Маршрут не найден' }));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('MongoDB подключена');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Сервер запущен на порту ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err.message);
    process.exit(1);
  });
