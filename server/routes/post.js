const express = require('express');

const router = express.Router()

// Import controller methods.
const { create } = require('../controllers/post')

router.get('/post', create);

module.exports = router;