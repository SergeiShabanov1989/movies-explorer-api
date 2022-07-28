// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Movie = require('../models/movie');

const { OK, CREATED } = require('../utils/utils');
// const NotFoundError = require('../errors/not-found-err')
const BadRequestError = require('../errors/bad-request-err');
// const ConflictError = require('../errors/conflict-err');
// const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});

    if (req.user._id === movie.owner.toString()) {
      return res.status(OK).send(movie)
    }
    return next(new ForbiddenError('Нет доступа'));
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN })
    res.status(CREATED).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданны некоректные данные'))
    } else {
      next(err);
    }
  }
};

