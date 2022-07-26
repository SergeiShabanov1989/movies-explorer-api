const Movie = require('../models/movie');

const { OK, CREATED } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    const movie = [];
    movies.forEach((everyMovie) => {
      if (req.user._id === everyMovie.owner.toString()) {
        movie.push(everyMovie);
      }
    });
    return res.status(OK).send(movie);
  } catch (err) {
    return next(err);
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
      nameEN,
    } = req.body;

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
      nameEN,
    });
    return res.status(CREATED).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданны некоректные данные'));
    }
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .orFail(() => new NotFoundError('Запрашиваемый фильм не найден'));
    if (req.user._id === movie.owner.toString()) {
      await movie.remove();
      return res.send({ message: 'Фильм удален' });
    }
    return next(new ForbiddenError('Нет доступа'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Неверное передан id'));
    }
    return next(err);
  }
};
