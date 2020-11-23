const express = require('express');
const router = express.Router();

/* GET home page. */

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Daftar Nama Kelompok dan Navigasi
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/', function(req, res, next) {
  res.render('index', {title: "Landing"});
});

router.use('/qr', require('./qrcode'));

module.exports = router;
