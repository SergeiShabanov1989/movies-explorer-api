const router = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserJoiValidation } = require('../utils/validationJoi');

router.get('/me', getUser);
router.patch('/me', updateUserJoiValidation, updateUserInfo);

module.exports = router;
