const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// Instantiate the express app.
const app = express();

// Middleware.
app.use(cors());
app.use(morgan('dev'));

// Routes.
app.get('*', (req, res) => {
  res.json({
    data: 'You reached nodejs api for react node crud apps!',
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
