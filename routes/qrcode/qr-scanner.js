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
 *     summary: Page untuk qr scanner, check in, dan check out
 *     tags:
 *       - Pages
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
 *    summary: Check in pengunjung menurut id_pengunjung
 *    tags: 
 *      - QR Code
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
 *        description: OK
 *        schema:
 *          type: string
 *          example:
 *            - Pengunjung ${nama_pengunjung} baru saja berhasil check in ke ${id_ruangan}
 *            - Pengunjung ${nama_pengunjung} sudah check in di ruangan ${id_ruangan}
 *      400:
 *        description: Bad Request
 *        schema:
 *          type: string
 *          example:
 *            - Tolong lengkapi body (perlu id_pengunjung dan id_ruangan)!
 *            - Tolong masukkan id_pengunjung dengan format UUID yang benar!
 *            - Pengunjung ${nama_pengunjung} ingin masuk ke ruangan ${id_ruangan}, tapi sesi izinnya sudah expired!
 *            - Pengunjung ${nama_pengunjung} ingin mencoba check in ke ${id_ruangan}, tapi tidak punya izin!
 *      404:
 *        description: Not Found
 *        schema:
 *          type: string
 *          example: Tidak menemukan pengunjung dengan id itu
 *      500:
 *        description: Server / Database Error
 *        schema:
 *          type: string
 *          example: Internal Server Error
 */

router.post('/checkin', async (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;
  let t = await sequelize.transaction();


  if (!id_pengunjung || !id_ruangan) {
    // Case 1: Kalo misalnya kurang format id_pengunjung atau id_ruangan
    res.status(400).send("Tolong lengkapi body (perlu id_pengunjung dan id_ruangan)!")
  }

  let visitorInQuery = await Pengunjung.findOne({where: {id_pengunjung}})
  .catch((e) => {
    // Case 2: Kalo misalnya id_pengunjung formatnya bukan uuid
    res.status(400).send("Tolong masukkan id_pengunjung dengan format UUID yang benar!")
  })

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
            
            await Pengunjung.update({
              current_ruangan: id_ruangan
            }, {
              where: {id_pengunjung},
              transaction: t
            })
            
            
            let temp = await (() => {return Pengunjung.sum('jumlah_pengunjung', {where: {current_ruangan: id_ruangan} } )}) ()
            await LogRuangan.create({
              id_ruangan,
              jumlah_pengunjung: (temp || 0) + visitorInQuery.get('jumlah_pengunjung'), 
              waktu_log: Date.now()
            }, {
              transaction: t
            })
            
            await t.commit();
            // Case 3: Pengunjung berhasil check in karena id_pengunjung ketemu, id_ruangan 
            res.status(200).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} baru saja berhasil check in ke ${id_ruangan}`)
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
            // Case 4: Pengunjung sudah check in di ruangan 
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

          // Case 5: Pengunjung gagal check in karena sessionnya sudah expired
          res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin masuk ke ruangan ${id_ruangan}, tapi sesi izinnya sudah expired!`)
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

        // Case 6: Pengunjung gagal check in karena tidak ada izinnya
        res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin mencoba check in ke ${id_ruangan}, tapi tidak punya izin!`)
      } catch (error) {
        await t.rollback()

        // Case 7: Pengunjung gagal check in dan gagal buat log karena kesalahan pada id_pengunjung atau id_ruangan
        res.status(500).send(`Internal Server Error.`)
      }
    }
  } else {
    // Case 8: Pengunjung gagal check in karena tidak menemukan pengunjung dengan id tersebut
    res.status(404).send("Tidak menemukan pengunjung dengan id itu")
  }
})

 /**
 * @swagger
 *
 * /qr/qr-scanner/checkout:
 *  post:
 *    summary: Check out pengunjung dengan id yang disimpan di QR code
 *    tags:
 *      - QR Code
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
 *        description: OK
 *        schema:
 *          type: string
 *          example:
 *            - Pengunjung ${nama_pengunjung} baru saja keluar dari ${id_ruangan}
 *            - Pengunjung ${nama_pengunjung} tidak ada di ruangan ${id_ruangan} atau mungkin sudah check out
 *      400:
 *        description: Bad Request
 *        schema:
 *          type: string
 *          example:
 *            - Tolong lengkapi body (perlu id_pengunjung dan id_ruangan)!
 *            - Tolong masukkan id_pengunjung dengan format UUID yang benar!
 *            - Pengunjung ${nama_pengunjung} ingin check out dari ruang ${id_ruangan}, tapi tidak ada izin!
 *      404:
 *        description: Not Found
 *        schema:
 *          type: string
 *          example:
 *            - Tidak menemukan pengunjung dengan id itu
 *      500:
 *        description: Server / Database Error
 *        schema:
 *          type: string
 *          example:
 *            - Internal Server Error
 */

router.post('/checkout', async (req, res) => {
  let { id_pengunjung, id_ruangan } = req.body;

  let t = await sequelize.transaction();

  if (!id_pengunjung || !id_ruangan) {
    // Case 1: Kalo misalnya kurang format id_pengunjung atau id_ruangan
    res.status(400).send("Tolong lengkapi body (perlu id_pengunjung dan id_ruangan)!")
  }

  let visitorInQuery = await Pengunjung.findOne({where: {id_pengunjung}})
  .catch((e) => {
    // Case 2: Kalo misalnya id_pengunjung formatnya bukan uuid
    res.status(400).send("Tolong masukkan id_pengunjung dengan format UUID yang benar!")
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

          let temp = await (() => {return Pengunjung.sum('jumlah_pengunjung', {where: {current_ruangan: id_ruangan} } )}) ()
          await LogRuangan.create({
            id_ruangan,
            jumlah_pengunjung: (temp || 0) - visitorInQuery.get('jumlah_pengunjung'), 
            waktu_log: Date.now()
          }, {
            transaction: t
          })
  
          await t.commit();
          // Case 3: Pengunjung berhasil check out
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

          // Case 4: Pengunjung gagal check out karena sudah keburu checkout
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
        await t.commit()
        // Case 5: Pengunjung gagal check out karena tidak ada izin dari daftar ruangannya yang diberikan izin;
        res.status(400).send(`Pengunjung ${visitorInQuery.get('nama_pengunjung')} ingin check out dari ruang ${id_ruangan}, tapi tidak ada izin!`)
      } catch (error) {
        await t.rollback()
        // Case 7: Semua 500 itu gara2 salah dari database atau salah format id_pengunjung dan id_ruangan
        res.status(500).send("Internal Server Error")
      }
    }
  } else {
    // Case 6: Pengunjung yang mana ya?
    res.status(404).send("Tidak menemukan pengunjung dengan id itu")
  }
})

module.exports = router;
