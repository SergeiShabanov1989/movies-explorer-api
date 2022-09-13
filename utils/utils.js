const { Joi } = require('celebrate');

module.exports.DB_URL = `${process.env.MONGO_DB_URL || 'mongodb://localhost:27017/moviesdb'}`;

// module.exports.REGEX_RU = Joi.string().regex(/^[?!,.<>А-ЯЁа-яё0-9\s]+$/);
// module.exports.REGEX_EN = Joi.string().regex(/^[?!,.<>A-Za-z0-9\s\d]+$/);
module.exports.REGEX_URL = Joi.string().regex(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/);
