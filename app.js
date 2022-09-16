require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const { DB_URL } = require('./utils/utils');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3001 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://api.nomoreparties.co/beatfilm-movies',
    'https://sergeishabanov.diplom.nomoredomains.sbs',
    'http://sergeishabanov.diplom.nomoredomains.sbs',
    'https://github.com/SergeiShabanov1989',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(routes);

async function main() {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    throw new Error(err);
  }
  app.listen(PORT);
}

main();

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);
