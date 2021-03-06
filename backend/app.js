require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {errors, celebrate, Joi} = require('celebrate');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');
const {login, createUser} = require('./controllers/user');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
const {requestLogger, errorLogger} = require('./middlewares/logger');

const {PORT = 3000} = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(cors({
  origin: ['http://dankuzmenko.mesto.nomoredomains.work',
    'https://dankuzmenko.mesto.nomoredomains.work'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
  }),
}), createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res, next) => {
  next(new ErrorNotFound('Введен неправильный путь'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
}

main();
