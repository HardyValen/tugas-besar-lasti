const express = require('express');
const { Server } = require('http');
const QRcode = require('qrcode');
const stream = require('stream');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 *
 * /qr/qr-generator:
 *  get:
 *    summary: 
 *      Mengubah query content menjadi QR Code dengan High Error Correction
 *    tags:
 *      - QR Code
 *    parameters:
 *      - name: content
 *        description: Content biasanya berupa UUID v4 dari id_pengunjung yang akan dijadikan body dari QR Code, Gaboleh empty string
 *        in: query
 *        type: string
 *    produces:
 *      - image/png
 *    responses:
 *      200:
 *        description: QR Code Image dengan body = req.query.content
 */

router.get('/', async function(req, res) {
  const { content } = req.query;
  try {
    const qrStream = new stream.PassThrough();
    await QRcode.toFileStream(qrStream, content, {
      type: 'png',
      width: 240,
      errorCorrectionLevel: 'H'
    })
      
    qrStream.pipe(res);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

/**
 * @swagger
 *
 * /qr/qr-generator/page:
 *   get:
 *     summary: Render page form untuk registrasi pengunjung rumah sakit
 *     tags:
 *       - Pages
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/page', function(req, res) {
  res.render('qr-gen-page', {title: "QR Generator"});
});


module.exports = router;
