const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question'); // Подключение модели

const app = express();
const port = 5000;

// Настройка CORS
app.use(cors());

// Парсинг JSON
app.use(express.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/hsk5_questions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// API для получения вопросов
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Получение всех вопросов из MongoDB
    res.json(questions);
  } catch (err) {
    res.status(500).send('Error retrieving questions');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});