const express = require('express');
const QRcode = require('qrcode');
const stream = require('stream');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', async function(req, res) {
  const { content } = req.query;
  try {
    // let content = uuidv4();
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

router.post('/', (req, res) => {
  let id_pengunjung = uuidv4();
  let data = {
    id_pengunjung,
    ...req.body
  }

  console.log(data);
  res.redirect(`/qr/qr-generator?content=${id_pengunjung}`, 301)
})

router.get('/page', function(req, res) {
  res.render('qr-gen-page', {title: "QR Generator"});
});


module.exports = router;
