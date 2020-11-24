const express = require('express');
const { routes } = require('../../app');
const router = express.Router();

let commonCreatedDate = new Date(Date.now() + ((7) * 3600000));
let commonExpiredDate = new Date(Date.now() + ((2 + 7) * 3600000));

let commonPastDate = new Date(Date.now() - ((24 - 7) * 3600000));
let commonPastExpiredDate = new Date(Date.now() - ((22 - 7)  * 3600000));

let visitorsList = [
  {
    id_pengunjung: "b1d42a9f-0a58-44ec-824e-a56929d7fa3a",
    nama_pengunjung: "Jhon Doe",
    jumlah_pengunjung: "3",
    created_date: commonCreatedDate.toISOString(),
    expired_date: commonExpiredDate.toISOString(),
    permissions: ["Kelas1_1701"],
  },
  {
    id_pengunjung: "1f17841a-8c57-4026-8e08-003a98092853",
    nama_pengunjung: "Mary Ann",
    jumlah_pengunjung: "5",
    created_date: commonCreatedDate.toISOString(),
    expired_date: commonExpiredDate.toISOString(),
    permissions: ["Kelas1_1702"],
  },
  {
    id_pengunjung: "ba440a58-4300-4a16-a646-28d70b15af95",
    nama_pengunjung: "Bob Ross",
    jumlah_pengunjung: "4",
    created_date: commonPastDate.toISOString(),
    expired_date: commonPastExpiredDate.toISOString(),
    permissions: ["Kelas1_1701"],
  },
  {
    id_pengunjung: "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
    nama_pengunjung: "Alice Sue",
    jumlah_pengunjung: "1",
    created_date: commonPastDate.toISOString(),
    expired_date: commonPastExpiredDate.toISOString(),
    permissions: ["Kelas1_1702"],
  }
]

let visitorLog = [
  {
    id_pengunjung: "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
    ruangan: "Kelas1_1702",
    jenis: "Check In",
    timestamp: new Date(Date.now() - (((24 - 7)  * 3600000) + 300000)).toISOString()
  },
  {
    id_pengunjung: "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
    ruangan: "Kelas1_1702",
    jenis: "Check Out",
    timestamp: new Date(Date.now() - ((22 - 7)  * 3600000) + 300000).toISOString()
  }
]

/**
 * @swagger
 *
 * /qr/qr-scanner/page:
 *   get:
 *     summary: Page untuk qr scanner
 *     description: Render page form untuk check in, check out, dan QR Code Scanner pengunjung rumah sakit
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/page', function(req, res) {
  res.render('qr-scanner-page', {title: "QR Scanner"});
});

 /**
 * @swagger
 *
 * /qr/qr-scanner/checkin:
 *  post:
 *    summary: Check in pengunjung dengan id yang disimpan di QR code
 *    parameters:
 *      - in: formData
 *        name: id_pengunjung
 *        description: String UUID hasil scan dari QR Code
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *      - in: formData
 *        name: id_ruangan
 *        description: String yang merepresentasikan identitas ruangan
 *        type: string
 *        example: Kelas1_1702
 *    produces:
 *      - text/plain
 *    responses:
 *      200:
 *        description: Mengembalikan pesan singkat untuk keperluan logging
 *      400:
 *        description: Jika pengunjung ingin check in ke ruangan yang tidak dikasih izin, atau sudah expired sesi kunjungannya
 *      404:
 *        description: Jika id_pengunjung tidak ditemukan di database
 */

router.post('/checkin', (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;

  if (!id_pengunjung) {
    res.status(404).send("Visitor Not Found!")
  }

  let visitorInQuery = visitorsList.filter((data) => {return (data.id_pengunjung.indexOf(id_pengunjung) > -1)})

  if (visitorInQuery.length > 0) {
    let visitorTemp = visitorInQuery[0];
    
    if (visitorTemp.permissions.indexOf(id_ruangan) > -1) {
      if (new Date(visitorTemp.expired_date).valueOf() > Date.now()) {
        res.status(200).send(`Visitor ${visitorTemp.nama_pengunjung} has just going into ${id_ruangan}`)
      } else {
        res.status(400).send(`Visitor ${visitorTemp.nama_pengunjung} wanted to check in to ${id_ruangan}, but the registry session has been expired! (Visitor expiration date is ${new Date(visitorTemp.expired_date).valueOf()} while time now is ${Date.now()})`)
      }
    } else {
      res.status(400).send(`Visitor ${visitorTemp.nama_pengunjung} is trying to check in to ${id_ruangan}, which isn't included in subject's permission!`)
    }
  } else {
    res.status(404).send("Visitor Not Found")
  }
})

 /**
 * @swagger
 *
 * /qr/qr-scanner/checkout:
 *  post:
 *    summary: Check out pengunjung dengan id yang disimpan di QR code
 *    parameters:
 *      - in: formData
 *        name: id_pengunjung
 *        description: String UUID hasil scan dari QR Code
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *      - in: formData
 *        name: id_ruangan
 *        description: String yang merepresentasikan identitas ruangan
 *        type: string
 *        example: Kelas1_1701
 *    produces:
 *      - text/plain
 *    responses:
 *      200:
 *        description: Mengembalikan pesan singkat untuk keperluan logging
 *      400:
 *        description: Jika pengunjung ingin check out dari ruangan yang tidak dikasih izin
 *      404:
 *        description: Jika id_pengunjung tidak ditemukan di database
 */

router.post('/checkout', (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;

  if (!id_pengunjung) {
    res.status(400).send("Visitor Not Found!")
  }

  let visitorInQuery = visitorsList.filter((data) => {return (data.id_pengunjung.indexOf(id_pengunjung) > -1)})

  if (visitorInQuery.length > 0) {
    let visitorTemp = visitorInQuery[0];
    
    if (visitorTemp.permissions.indexOf(id_ruangan) > -1) {
      res.status(200).send(`Visitor ${visitorTemp.nama_pengunjung} has just passed from ${id_ruangan}`)
    } else {
      res.status(400).send(`Visitor ${visitorTemp.nama_pengunjung} is trying to check out from ${id_ruangan}, which isn't included in subject's permission!`)
    }
  } else {
    res.status(403).send("No Visitor Found")
  }
})

/**
 * @swagger
 *
 * /qr/qr-scanner/get-visitor-data:
 *   get:
 *     summary: Mendapatkan data pengunjung berdasarkan id_pengunjung pada request query
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: query
 *         name: id_pengunjung
 *         description: String UUID hasil scan dari QR Code
 *         type: string
 *         example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *     responses:
 *       200:
 *        description: Kembalikan data json pengunjung
 *       404:
 *        description: Jika tidak ditemukan pengunjung pada database dengan id_pengunjung pada request query 
 */

router.get('/get-visitor-data', (req, res) => {
  let { id_pengunjung } = req.query;

  if (!id_pengunjung) {
    res.status(404).send("Visitor Not Found!")
  }
  
  let visitorInQuery = visitorsList.filter((data) => {return (data.id_pengunjung.indexOf(id_pengunjung) > -1)})
  if (visitorInQuery.length > 0) {
    res.status(200).json(visitorInQuery[0]);
  } else {
    res.status(404).send("Visitor Not Found!")
  }
})

/**
 * @swagger
 *
 * /qr/qr-scanner/get-visitor-data:
 *   get:
 *     summary: Mendapatkan data log pengunjung berdasarkan id_pengunjung pada request query
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: query
 *         name: id_pengunjung
 *         description: String UUID hasil scan dari QR Code
 *         type: string
 *         example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *     responses:
 *       200:
 *        description: Kembalikan data json log pengunjung
 *       404:
 *        description: Jika tidak ditemukan pengunjung pada database dengan id_pengunjung pada request query 
 */

router.get('/get-visitor-log', (req, res) => {
  let { id_pengunjung } = req.query;

  if (!id_pengunjung) {
    res.status(404).send("Visitor Not Found!")
  }
  
  let visitorInQuery = visitorLog.filter((data) => {return (data.id_pengunjung.indexOf(id_pengunjung) > -1)})
  if (visitorInQuery.length > 0) {
    res.status(200).json(visitorInQuery)
  } else {
    res.status(404).send("Visitor Not Found!")
  }
})

module.exports = router;
