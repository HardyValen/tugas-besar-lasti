const express = require('express');
const router = express.Router();

const sequelize = require('../services/database');
const { DataTypes } = require('sequelize');
const { v4 } = require('uuid');
const Pengunjung = require('../db/models/Pengunjung')(sequelize, DataTypes);
const LogPengunjung = require('../db/models/LogPengunjung')(sequelize, DataTypes);

/**
 * @swagger
 *
 * /pengunjung:
 *  get:
 *    summary: Ambil data satu pengunjung berdasarkan id atau seluruh pengunjung
 *    tags:
 *      - Pengunjung
 *    parameters:
 *      - in: query
 *        name: id
 *        description: String UUID Pengunjung
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *    responses:
 *      200:
 *        description: OK
 *        schema: 
 *          type: Pengunjung
 *          example: 
 *            [
                {
                  "id_pengunjung": "b1d42a9f-0a58-44ec-824e-a56929d7fa3a",
                  "nama_pengunjung": "Jhon Doe",
                  "jumlah_pengunjung": 3,
                  "current_ruangan": null,
                  "permissions": [
                    "Kelas1_1701"
                  ],
                  "created_date": "2020-11-27T14:05:05.089Z",
                  "expired_date": "2020-12-28T07:05:05.089Z"
                }
              ]
 *      400:
 *        description: Bad Request
 *        schema:
 *          type: string
 *          example: Format ID pengunjung salah, (Harus UUID)
 *      404:
 *        description: Not Found
 *        schema:
 *          type: string
 *          example: Tidak menemukan pengunjung
 *      
 */

router.get('/', async (req, res) => {
  let { id } = req.query;
  let data;

  if (!id) {
    data = await Pengunjung.findAll()
  } else {
    data = await Pengunjung.findAll({where: {id_pengunjung: id}}).catch(e => {
      res.status(400).send('Format ID pengunjung salah, (Harus UUID)!')
    })
  }
  
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).send(id ? `Tidak menemukan pengunjung dengan ID: ${id}` : `Tidak menemukan pengunjung`);
  }
})

/**
 * @swagger
 *
 * /pengunjung:
 *  post:
 *    summary: Membuat satu pengunjung baru pada sistem
 *    tags:
 *      - Pengunjung
 *    parameters:
 *      - in: formData
 *        name: nama_pengunjung
 *        type: string
 *        example: Testt
 *      - in: formData
 *        name: jumlah_pengunjung
 *        type: integer
 *        example: 2
 *      - in: formData
 *        name: permissions
 *        type: string[]
 *        example: ['Suite_1101', 'Kelas1_1701']
 *      - in: formData
 *        name: expired_date
 *        type: datetime
 *        example: 2020-11-27 14:35:21.32+00
 *    responses:
 *      301:
 *        description: Pengunjung berhasil dibuat, Di redirect menuju GET /qr/qr-generator?content={id_pengunjung}
 *      500:
 *        description: Server / Database Error
 */

router.post('/', async (req, res) => {
  let { 
    nama_pengunjung,
    jumlah_pengunjung,
    expired_date,
    permissions, 
  } = req.body;

  let id_pengunjung = v4();
  let t = await sequelize.transaction();

  if (!Array.isArray(permissions)) {
    let temp = permissions;
    permissions = [];
    permissions.push(temp);
    console.log(permissions)
  }

  try {
    await Pengunjung.create({
      id_pengunjung,
      nama_pengunjung,
      jumlah_pengunjung,
      permissions,
      created_date: Date.now(),
      expired_date
    }, {
      transaction: t
    })

    await t.commit();
    res.redirect(`/qr/qr-generator?content=${id_pengunjung}`, 301)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }

});

/**
 * @swagger
 *
 * /pengunjung:
 *  put:
 *    summary: Update salah satu pengunjung.
 *    tags:
 *      - Pengunjung
 *    parameters:
 *      - in: formData
 *        name: id_pengunjung
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *      - in: formData
 *        name: nama_pengunjung
 *        type: string
 *        example: Test
 *      - in: formData
 *        name: jumlah_pengunjung
 *        type: integer
 *        example: 4
 *      - in: formData
 *        name: permissions
 *        type: string[]
 *        example: ['Suite_1101', 'Kelas1_1701']
 *      - in: formData
 *        name: expired_date
 *        type: datetime
 *        example: 2020-11-27 14:35:21.32+00
 *    responses:
 *      200:
 *        description: OK, Pengunjung dengan id ${id_pengunjung} telah berhasil diupdate
 *      400:
 *        description: Bad Request, Masukkan UUID Pengunjung dengan benar!
 *      404:
 *        description: Not Found, Tidak menemukan pengunjung dengan id ${id_pengunjung
 *      500:
 *        description: Server / Database Error
 * 
 * /pengunjung/update:
 *  post:
 *    summary: Update salah satu pengunjung, Sama fungsinya seperti PUT /pengunjung.
 *    tags:
 *      - Pengunjung
 *    parameters:
 *      - in: formData
 *        name: id_pengunjung
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb
 *      - in: formData
 *        name: nama_pengunjung
 *        type: string
 *        example: Test
 *      - in: formData
 *        name: jumlah_pengunjung
 *        type: integer
 *        example: 4
 *      - in: formData
 *        name: permissions
 *        type: string[]
 *        example: ['Suite_1101', 'Kelas1_1701']
 *      - in: formData
 *        name: expired_date
 *        type: datetime
 *        example: 2020-11-27 14:35:21.32+00
 *    responses:
 *      200:
 *        description: OK, Pengunjung dengan id ${id_pengunjung} telah berhasil diupdate
 *      400:
 *        description: Bad Request, Masukkan UUID Pengunjung dengan benar!
 *      404:
 *        description: Not Found, Tidak menemukan pengunjung dengan id ${id_pengunjung
 *      500:
 *        description: Server / Database Error
 */

const updatePengunjung = async (req, res) => {
  let {
    id_pengunjung,
    nama_pengunjung,
    jumlah_pengunjung,
    permissions,
    expired_date
  } = req.body;

  if (!Array.isArray(permissions)) {
    let temp = permissions;
    permissions = [];
    permissions.push(temp);
    console.log(permissions)
  }

  let findPengunjung = await Pengunjung.findOne({where: {id_pengunjung}}).catch(e => {
    res.status(400).send('Masukkan UUID Pengunjung dengan benar!')
  }) 

  if (!findPengunjung) {
    res.status(404).send(`Tidak menemukan pengunjung dengan id ${id_pengunjung}`)
  }

  const t = await sequelize.transaction();
  try {
    await Pengunjung.update({
      nama_pengunjung,
      jumlah_pengunjung,
      permissions,
      expired_date
    }, {
      where: {id_pengunjung},
      transaction: t
    })
    await t.commit();
    res.status(200).send(`Pengunjung dengan id ${id_pengunjung} telah berhasil diupdate`);

  } catch (error) {
    console.log(error.message)
    await t.rollback();
    res.status(500).send(`Internal Server Error`)
  }
}

router.put('/', (req, res) => {updatePengunjung(req, res)})
router.post('/update', (req, res) => {updatePengunjung(req, res)})

/**
 * @swagger
 *
 * /pengunjung/log:
 *  get:
 *    summary: Ambil log pengunjung berdasarkan id atau semua log pengunjung
 *    tags:
 *      - Pengunjung
 *      - Logs
 *    parameters:
 *      - in: query
 *        name: id
 *        type: string
 *        example: 4f5c9fcc-4b37-4db5-be24-750d657ee7bb      
 *    responses:
 *      200:
 *        description: OK
 *        schema:
 *          type: LogPengunjung
 *          example:
 *            [
                  {
                      "id_log": 3,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1702",
                      "tipe_log": "Check Out Failure (Already Checked In)",
                      "waktu_log": "2020-11-27T14:11:02.849Z"
                  },
                  {
                      "id_log": 4,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1702",
                      "tipe_log": "Check Out Failure (Already Checked In)",
                      "waktu_log": "2020-11-27T14:11:31.370Z"
                  },
                  {
                      "id_log": 11,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1701",
                      "tipe_log": "Check In Failure (No Permission)",
                      "waktu_log": "2020-11-27T14:22:21.566Z"
                  },
                  {
                      "id_log": 13,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1701",
                      "tipe_log": "Check Out Failure (No Permission)",
                      "waktu_log": "2020-11-27T14:24:38.827Z"
                  },
                  {
                      "id_log": 17,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1702",
                      "tipe_log": "Check In",
                      "waktu_log": "2020-11-27T14:32:23.436Z"
                  },
                  {
                      "id_log": 18,
                      "id_pengunjung": "4f5c9fcc-4b37-4db5-be24-750d657ee7bb",
                      "id_ruangan": "Kelas1_1702",
                      "tipe_log": "Already Checked In!",
                      "waktu_log": "2020-11-27T14:32:50.865Z"
                  }
              ]
 *      400:
 *        description: Bad Request, Masukkan UUID Pengunjung dengan benar 
 *      404:
 *        description: Not Found, Tidak ada entri pada log pengunjung
 */

router.get('/log', async (req, res) => {
  let { id } = req.query;
  let data;

  if (!id) {
    data = await LogPengunjung.findAll()
  } else {
    data = await LogPengunjung.findAll({where: {id_pengunjung: id}}).catch(e => {
      res.status(400).send('Masukkan UUID Pengunjung dengan benar!')
    });
  }
  
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).send(id ? `Tidak ada entri pada log pengunjung ${id}` : `Tidak ada entri pada log pengunjung`);
  }
})

/**
 * @swagger
 *
 * /pengunjung/page:
 *  get:
 *    summary: Dashboard untuk kontrol pengunjung
 *    tags:
 *      - Pages
 *    produces:
 *      - text/html
 *    responses:
 *      200:
 *        description: OK
 */

router.get('/page', (req, res) => {
  res.render('pengunjung', {title: "Dashboard Pengunjung"});
})


module.exports = router;
