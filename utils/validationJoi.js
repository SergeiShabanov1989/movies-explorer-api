const { celebrate, Joi } = require('celebrate');
const { REGEX_URL, REGEX_RU, REGEX_EN } = require('./utils');

const createUserJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginUserJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieJoiValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: REGEX_URL.required(),
    trailerLink: REGEX_URL.required(),
    thumbnail: REGEX_URL.required(),
    movieId: Joi.number().required(),
    nameRU: REGEX_RU.required(),
    nameEN: REGEX_EN.required(),
  }),
});

const deleteMovieJoiValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  createUserJoiValidation,
  loginUserJoiValidation,
  updateUserJoiValidation,
  createMovieJoiValidation,
  deleteMovieJoiValidation,
};
