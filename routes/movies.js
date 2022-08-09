const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieJoiValidation, deleteMovieJoiValidation } = require('../utils/validationJoi');

router.get('/', getMovies);
router.post('/', createMovieJoiValidation, createMovie);
router.delete('/:movieId', deleteMovieJoiValidation, deleteMovie);

module.exports = router;
