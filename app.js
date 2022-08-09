require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');
const { DB_URL } = require('./utils/utils');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;
const app = express();

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
