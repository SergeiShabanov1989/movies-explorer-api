const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const {
//   getUsers,
//   getUserById,
//   updateUserInfo,
//   updateUserAvatar,
//   getUser,
// } = require('../controllers/users');
// const { REGEX_ID, REGEX_URL } = require('../utils/utils');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;