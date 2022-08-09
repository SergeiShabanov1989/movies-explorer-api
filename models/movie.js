const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/.test(v),
      message: 'Должна быть ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/.test(v),
      message: 'Должна быть ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/.test(v),
      message: 'Должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator: (v) => /^[?!,.<>А-ЯЁа-яё0-9\s]+$/gi.test(v),
      message: 'Должно быть название на русском языке',
    },
    required: true,
  },
  nameEN: {
    type: String,
    validate: {
      validator: (v) => /^[?!,.<>A-Za-z0-9\s\d]+$/gi.test(v),
      message: 'Должно быть название на английском языке',
    },
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
