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
      validator: function checkCredentials() {
        if (!/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/ || !/(^[A-Za-z])/) {
          return false;
        }
        return true;
      },
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
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// validate: {
//   validator: (v) => /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/ || /(^[A-Za-z])/.test(v),
//     message: 'Должна быть ссылка',
// },

module.exports = mongoose.model('movie', movieSchema);
