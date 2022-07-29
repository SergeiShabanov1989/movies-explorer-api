const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { REGEX_URL, REGEX_RU, REGEX_EN } = require('../utils/utils')

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1),
    director: Joi.string().required().min(1),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    image: REGEX_URL.required(),
    trailerLink: REGEX_URL.required(),
    thumbnail: REGEX_URL.required(),
    movieId: Joi.number().required().min(1),
    nameRU: REGEX_RU.required(),
    nameEN: REGEX_EN.required(),
  }),
}), createMovie)
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
}), deleteMovie);

module.exports = router;