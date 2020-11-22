const express = require('express');
const QRcode = require('qrcode');
const stream = require('stream');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', async function(req, res) {
  
  // const r = fs.createReadStream(__dirname + "/buffer.png")
  // const r = QRcode.toFileStream(stream, "Hello World");
  // const ps = new stream.PassThrough()
  // stream.pipeline(r, ps, (err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).send(err)
  //   }
  // })
  // ps.pipe(res);

  try {
    let content = uuidv4();
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

router.get('/page', function(req, res) {
  res.render('qr-render');
});


module.exports = router;
