const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const asrController = require('../controllers/asrController');

router.post('/transcribe', upload.single('audio'), asrController.transcribe);

module.exports = router;