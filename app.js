require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { ERROR, DB_URL } = require('./utils/utils');
const routes = require('./routes');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

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

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(ERROR).send({ message: 'Ошибка по умолчанию' });
});
