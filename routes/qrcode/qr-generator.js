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
 *    description: 
 *      Mengubah query content menjadi QR Code dengan High Error Correction
 *    parameters:
 *      - name: content
 *        description: Content biasanya berupa UUID v4 dari id_pengunjung yang akan dijadikan body dari QR Code, Gaboleh empty string
 *        in: query
 *        required: true
 *        type: string
 *        default: 7c4d851d-6030-4c64-9f51-3145b025cea7
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
 * /qr/qr-generator:
 *  post:
 *    description: 
 *      <ol>
 *      <li>Membuat sebuah uuid v4 sebagai id_pengunjung</li>
 *      <li>Membuat created_date sebagai waktu pendaftaran pengunjung dalam bentuk ISO Date</li>
 *      <li>Menyimpan data pengunjung yang berupa id, nama, jumlah, created_date, expired_date, dan permissions dalam basis data sistem (Dalam mock up ini, data tidak sepenuhnya disimpan dalam database.)</li>
 *      <li>Jika berhasil menyimpan data, redirect menuju GET /qr/qr-generator dengan req.query = id_pengunjung (uuid v4)</li>
 *      </ol>
 *    parameters:
 *      - name: nama_pengunjung
 *        description: Nama sesuai dengan KTP pengunjung (atau perwakilan pengunjung)
 *        in: formData
 *        required: true
 *        type: string
 *        default: null
 *      - name: jumlah_pengunjung
 *        description: Jumlah Pengunjung yang terdaftar dalam satu QR Code itu
 *        in: formData
 *        required: true
 *        default: 1
 *        type: integer
 *      - name: expired_date
 *        description: Tenggang waktu masa pakai QR Code itu
 *        in: formData
 *        required: true
 *        type: date
 *        default: "2020-11-23T10:43"
 *      - name: permissions
 *        description: Himpunan ID Ruangan yang dapat dikunjungi oleh Pengunjung, Null artinya tidak bisa akses ruang manapun.
 *        in: formData
 *        required: true
 *        type: string[]
 *        default: null
 *    produces:
 *      - image/png
 *    responses:
 *      301:
 *        description: Redirect ke /qr/qr-generator?content=id_pengunjung
 */

router.post('/', (req, res) => {
  let id_pengunjung = uuidv4();
  let data = {
    id_pengunjung,
    ...req.body
  }

  console.log(data);
  res.redirect(`/qr/qr-generator?content=${id_pengunjung}`, 301)
})

/**
 * @swagger
 *
 * /qr/qr-generator/page:
 *   get:
 *     description: Render page form untuk registrasi pengunjung rumah sakit
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
