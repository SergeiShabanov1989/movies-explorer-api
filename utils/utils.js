const { Joi } = require('celebrate')

module.exports.OK = 200;
module.exports.CREATED = 201;
module.exports.BAD_REQUEST = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.CONFLICT = 409;
module.exports.ERROR = 500;

module.exports.REGEX_RU = Joi.string().regex(/^[?!,.<>А-ЯЁа-яё0-9\s]+$/);
module.exports.REGEX_EN = Joi.string().regex(/^[?!,.<>A-Za-z0-9\s\d]+$/);
module.exports.REGEX_URL = Joi.string().regex(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/);