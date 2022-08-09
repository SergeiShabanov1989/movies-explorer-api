const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');

const { createUserJoiValidation, loginUserJoiValidation } = require('../utils/validationJoi');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', loginUserJoiValidation, login);
router.post('/signup', createUserJoiValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
