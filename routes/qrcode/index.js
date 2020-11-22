const express = require('express');
const router = express.Router();

router.use('/qr-generator', require("./qr-generator"));
router.use('/qr-reader', require("./qr-reader"));

module.exports = router;
