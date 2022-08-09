const { ERROR } = require('../utils/constants');

module.exports.handleErrors = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.statusCode === ERROR ? 'Ошибка на сервере' : err.message });

  next();
};
