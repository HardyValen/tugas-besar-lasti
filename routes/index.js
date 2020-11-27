const express = require('express');
const router = express.Router();

/* GET home page. */

/**
 * @swagger
 *
 * /:
 *   get:
 *     summary: Daftar Nama Kelompok dan Navigasi
 *     tags:
 *       - Pages
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
router.use('/ruangan', require('./ruangan'));
router.use('/pengunjung', require('./pengunjung'));

module.exports = router;
