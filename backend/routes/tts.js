const express = require('express');
const router = express.Router();
const ttsController = require('../controllers/ttsController');

router.post('/synthesize', ttsController.synthesize);

module.exports = router;
