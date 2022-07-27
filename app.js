const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { ERROR } = require('./utils/utils');
const routes = require('./routes')

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/moviesdb');
  } catch (err) {
    throw new Error(err);
  }
  app.listen(PORT);
}

main();

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(ERROR).send({ message: 'Ошибка по умолчанию' });
});
