const express = require('express');
const fs = require('fs');
const stream = require('stream')
const router = express.Router();

router.get('/', function(req, res) {
  res.send('OK');
});

router.get('/page', function(req, res) {
  res.render('qr-render');
});


module.exports = router;
