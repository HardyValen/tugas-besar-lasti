const express = require('express');
const router = express.Router();

router.use('/qr-generator', require("./qr-generator"));
router.use('/qr-scanner', require("./qr-scanner"));

module.exports = router;
