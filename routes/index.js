const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {layout: 'index'});
});

router.use('/qr', require('./qrcode'));

module.exports = router;
