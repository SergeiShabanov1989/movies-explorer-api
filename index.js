const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/moviesdb');
  } catch (err) {
    throw new Error(err);
  }
  app.listen(PORT);
}

main();
