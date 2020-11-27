const express = require('express');
const sequelize = require('../../services/database');
const { DataTypes } = require('sequelize');
const Pengunjung = require('../../db/models/Pengunjung')(sequelize, DataTypes);
const LogPengunjung = require('../../db/models/LogPengunjung')(sequelize, DataTypes);
const Ruangan = require('../../db/models/Ruangan')(sequelize, DataTypes);
const LogRuangan = require('../../db/models/LogRuangan')(sequelize, DataTypes);
const router = express.Router();

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

router.post('/checkin', async (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;
  let t = await sequelize.transaction();


  if (!id_pengunjung) {
    res.status(400).send("Tolong sertakan body id_pengunjung!")
  }

  // Case 0: Kalo misalnya id_pengunjung formatnya bukan uuid
  let visitorInQuery = await Pengunjung.findOne({where: {id_pengunjung}})
  .catch((e) => {
    res.send(400).send("Tolong masukkan id_pengunjung dengan format UUID yang benar!")
  })

  // Case 1: Ga Ketemu Pengunjung
  if (visitorInQuery) {
    if (visitorInQuery.permissions.indexOf(id_ruangan) > -1) {
      if (new Date(visitorInQuery.get('expired_date')).valueOf() > Date.now()) {
        if (visitorInQuery.get('current_ruangan') != id_ruangan) {
          try {
            await LogPengunjung.create({
              id_pengunjung,
              id_ruangan,
              tipe_log: "Check In",
              waktu_log: Date.now()
            }, {
              transaction: t
            })

            await LogRuangan.create({
              id_ruangan,
              jumlah_pengunjung: 0, 
              waktu_log: Date.now()
            }, {
              transaction: t
            })

            await Pengunjung.update({
              current_ruangan: id_ruangan
            }, {
              where: {id_pengunjung},
              transaction: t
            })

            await t.commit();
            res.status(200).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} baru saja check in ke ${id_ruangan}`)
          } catch (error) {
            await t.rollback()
            res.status(500).send("Internal Server Error")
          }
        } else {
          try {
            await LogPengunjung.create({
              id_pengunjung,
              id_ruangan,
              tipe_log: "Already Checked In!",
              waktu_log: Date.now()
            }, {
              transaction: t
            })
            await t.commit();
            res.status(200).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} sudah check in di ruangan ${id_ruangan}`)
          } catch (error) {
            await t.rollback()
            res.status(500).send("Internal Server Error")
          }
        }
      } else {
        try {
          await LogPengunjung.create({
            id_pengunjung,
            id_ruangan,
            tipe_log: "Check In Failure (Session Expired)",
            waktu_log: Date.now()
          }, {
            transaction: t
          })
          await t.commit();
          res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin masuk ke ruangan ${id_ruangan}, tapi sesi izinnya sudah expired!)`)
        } catch (error) {
          await t.rollback()
          res.status(500).send("Internal Server Error")
        }
      }
    } else {
      try {
        await LogPengunjung.create({
          id_pengunjung,
          id_ruangan,
          tipe_log: "Check In Failure (No Permission)",
          waktu_log: Date.now()
        }, {
          transaction: t
        })
        await t.commit();
        res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin mencoba check in ke ${id_ruangan}, tapi tidak punya izin!`)
      } catch (error) {
        await t.rollback()
        res.status(500).send("Internal Server Error")
      }
    }
  } else {
    res.status(404).send("Tidak menemukan pengunjung dengan id itu")
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

router.post('/checkout', async (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;

  let t = await sequelize.transaction();

  if (!id_pengunjung) {
    res.status(400).send("Tolong sertakan body id_pengunjung!")
  }

  let visitorInQuery = await Pengunjung.findOne({where: {id_pengunjung}})
  .catch((e) => {
    res.send(400).send("Tolong masukkan id_pengunjung dengan format UUID yang benar!")
  })

  if (visitorInQuery) {
    if (visitorInQuery.permissions.indexOf(id_ruangan) > -1) {
      if (visitorInQuery.get('current_ruangan') == id_ruangan) {
        try {
          await LogPengunjung.create({
            id_pengunjung,
            id_ruangan,
            tipe_log: "Check Out",
            waktu_log: Date.now()
          }, {
            transaction: t
          })

          await Pengunjung.update({
            current_ruangan: null
          }, {
            where: {id_pengunjung},
            transaction: t
          })
  
          await t.commit();
          res.status(200).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} baru saja keluar dari ${id_ruangan}`)
        } catch (error) {
          await t.rollback()
          res.status(500).send("Internal Server Error")
        }
      } else {
        try {
          await LogPengunjung.create({
            id_pengunjung,
            id_ruangan,
            tipe_log: "Check Out Failure (Already Checked In)",
            waktu_log: Date.now()
          }, {
            transaction: t
          })
  
          await t.commit();
          res.status(200).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} tidak ada di ruangan ${id_ruangan} atau mungkin sudah check out`)
        } catch (error) {
          await t.rollback()
          res.status(500).send("Internal Server Error")
        }
      }
    } else {
      try {
        await LogPengunjung.create({
          id_pengunjung,
          id_ruangan,
          tipe_log: "Check Out Failure (No Permission)",
          waktu_log: Date.now()
        }, {
          transaction: t
        })
        await t.commit();
        res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin check out dari ruang ${id_ruangan}, tapi tidak ada izin!`)
      } catch (error) {
        await t.rollback()
        res.status(500).send("Internal Server Error")
      }
    }
  } else {
    res.status(404).send("Tidak menemukan pengunjung dengan id itu")
  }
})

module.exports = router;
