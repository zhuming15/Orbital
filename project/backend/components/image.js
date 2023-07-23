const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the image file from the server
router.use('/image', express.static(path.join(__dirname, '../image')));

module.exports = router;