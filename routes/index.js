const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users')
const movieRouter = require('./movies')
// const { REGEX_ID, REGEX_URL } = require('../utils/utils');

const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(1),
    password: Joi.string().required().min(1),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email().min(1),
    password: Joi.string().required().min(1),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;