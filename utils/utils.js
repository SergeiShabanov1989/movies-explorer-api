const { Joi } = require('celebrate');

module.exports.DB_URL = `${process.env.MONGO_DB_URL || 'mongodb://localhost:27017/moviesdb'}`;

module.exports.REGEX_URL = Joi.string().regex(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/);
module.exports.REGEX_TRAILERLINK = Joi.string().regex(/(^[A-Za-zА-яё -]+$)/)
