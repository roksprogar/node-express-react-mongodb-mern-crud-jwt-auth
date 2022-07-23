const express = require('express');

const router = express.Router()

// Import controller methods.
const { create, list } = require('../controllers/post')

router.get('/', list);
router.post('/create', create);

module.exports = router;