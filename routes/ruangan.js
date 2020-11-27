const express = require('express');
const router = express.Router();

const sequelize = require('../services/database');
const { DataTypes } = require('sequelize');
const Pengunjung = require('../db/models/Pengunjung')(sequelize, DataTypes);
const Ruangan = require('../db/models/Ruangan')(sequelize, DataTypes);
const LogRuangan = require('../db/models/LogRuangan')(sequelize, DataTypes);

/**
 * @swagger
 *
 * /ruangan:
 *  get:
 *    summary: Ambil data satu ruangan berdasarkan id atau seluruh ruangan
 *    tags:
 *      - Ruangan
 *    parameters:
 *      - in: query
 *        name: id
 *        description: ID ruangan
 *        type: string
 *        example: Suite_1101
 *    responses:
 *      200:
 *        description: OK
 *        schema: 
 *          type: Ruangan
 *          example: 
 *            {
                  "id_ruangan": "Suite_1101",
                  "tipe_ruangan": "Suite"
              }
 *      404:
 *        description: Not Found
 *      
 */

router.get('/', async (req, res) => {
  let { id } = req.query;
  if (!id) {
    let data = await Ruangan.findAll();
    res.status(200).json(data)
  }

  let data = await Ruangan.findOne({where: {id_ruangan: id}})
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).send("Not Found");
  }

})

/**
 * @swagger
 *
 * /ruangan:
 *  post:
 *    summary: Membuat satu ruangan baru pada sistem
 *    tags:
 *      - Ruangan
 *    parameters:
 *      - in: formData
 *        name: id_ruangan
 *        type: string
 *        example: TestRoom_1001
 *      - in: formData
 *        name: tipe_ruangan
 *        type: string
 *        example: Test Room
 *    responses:
 *      201:
 *        description: Konten berhasil dibuat
 *      500:
 *        description: Server / Database Error
 */

router.post('/', async (req, res) => {
  let {id_ruangan, tipe_ruangan} = req.body;
  let t = await sequelize.transaction();

  try {
    await Ruangan.create({
      id_ruangan,
      tipe_ruangan
    }, {
      transaction: t
    });

    await t.commit();
    res.status(201).send("Konten berhasil dibuat!")
  } catch (error) {
    console.log(error.message);
    await t.rollback();
    res.status(500).send("Internal Server Error")
  }
})

/**
 * @swagger
 *
 * /ruangan:
 *  put:
 *    summary: Update salah satu ruangan.
 *    tags:
 *      - Ruangan
 *    parameters:
 *      - in: formData
 *        name: id_ruangan
 *        type: string
 *        example: TestRoom_1001
 *      - in: formData
 *        name: tipe_ruangan
 *        type: string
 *        example: Test Room
 *    responses:
 *      200:
 *        description: Update OK
 *      500:
 *        description: Server / Database Error
 * 
 * /ruangan/update:
 *  post:
 *    summary: tidak disarankan untuk dipakai, Fungsi sama seperti PUT /ruangan
 *    tags:
 *      - Ruangan
 */

const updateRuangan = async (req, res) => {
  let {id_ruangan, tipe_ruangan, id} = req.body;
  let t = await sequelize.transaction();

  try {
    await Ruangan.update({
      id_ruangan,
      tipe_ruangan,
    }, {
      where: {id_ruangan: id},
      transaction: t
    });
    await t.commit();
    res.status(200).send("Update OK")
  } catch (error) {
    console.log(error.message);
    await t.rollback();
    res.status(500).send("Internal Server Error")
  }
}

router.put('/', (req, res) => {updateRuangan(req, res)});
router.post('/update', (req, res) => {updateRuangan(req, res)})

/**
 * @swagger
 *
 * /ruangan:
 *  delete:
 *    summary: Delete salah satu ruangan.
 *    tags:
 *      - Ruangan
 *    parameters:
 *      - in: formData
 *        name: id_ruangan
 *        type: string
 *        example: TestRoom_1001
 *    responses:
 *      200:
 *        description: Delete OK
 *      500:
 *        description: Server / Database Error
 * 
 * /ruangan/delete:
 *  post:
 *    summary: tidak disarankan untuk dipakai, Fungsi sama seperti DELETE /ruangan
 *    tags:
 *      - Ruangan
 */


const deleteRuangan = async (req, res) => {
  let {id_ruangan} = req.body;
  let t = await sequelize.transaction();

  if (await Ruangan.findOne({where: {id_ruangan}}) === null) {
    res.status(404).send("Not Found");
  }

  try {
    await Ruangan.destroy({
      where: {id_ruangan},
      transaction: t
    })
    await t.commit();
    res.status(200).send("Delete OK")
  } catch (error) {
    console.log(error.message);
    await t.rollback();
    res.status(500).send("Internal Server Error")
  }
}

router.delete('/', (req, res) => {deleteRuangan(req, res)})
router.post('/delete', (req, res) => {deleteRuangan(req, res)})

/**
 * @swagger
 *
 * /ruangan/log:
 *  get:
 *    summary: Ambil log ruangan berdasarkan id atau semua log ruangan
 *    tags:
 *      - Ruangan
 *      - Logs
 *    parameters:
 *      - in: query
 *        name: id
 *        type: string
 *        example: Suite_1102      
 *    responses:
 *      200:
 *        description: OK
 *        schema:
 *          type: LogPengunjung
 *          example:
 *            [
                {
                    "id_log": 1,
                    "id_ruangan": "Suite_1102",
                    "jumlah_pengunjung": 2,
                    "waktu_log": "2020-11-27T14:29:35.072Z"
                },
                {
                    "id_log": 2,
                    "id_ruangan": "Suite_1102",
                    "jumlah_pengunjung": 0,
                    "waktu_log": "2020-11-27T14:30:29.785Z"
                },
                {
                    "id_log": 3,
                    "id_ruangan": "Kelas1_1702",
                    "jumlah_pengunjung": 10,
                    "waktu_log": "2020-11-27T14:32:23.463Z"
                },
                {
                    "id_log": 4,
                    "id_ruangan": "Suite_1102",
                    "jumlah_pengunjung": 2,
                    "waktu_log": "2020-11-27T14:34:19.749Z"
                },
                {
                    "id_log": 5,
                    "id_ruangan": "Suite_1102",
                    "jumlah_pengunjung": 22,
                    "waktu_log": "2020-11-27T14:35:07.741Z"
                },
                {
                    "id_log": 6,
                    "id_ruangan": "Suite_1102",
                    "jumlah_pengunjung": 2,
                    "waktu_log": "2020-11-27T14:35:21.320Z"
                },
                {
                    "id_log": 7,
                    "id_ruangan": "Kelas1_1702",
                    "jumlah_pengunjung": 11,
                    "waktu_log": "2020-11-27T14:48:12.426Z"
                },
                {
                    "id_log": 8,
                    "id_ruangan": "Kelas1_1702",
                    "jumlah_pengunjung": 10,
                    "waktu_log": "2020-11-27T14:48:57.320Z"
                }
            ]
 *      404:
 *        description: Not Found, Kami tidak menemukan id ruangan yang diminta atau memang belum ada entri untuk log ruangan itu.
 *      500:
 *        description: Server / Database Error
 */

router.get('/log', async (req, res) => {
  let { id } = req.query;

  if (!id) {
    data = await LogRuangan.findAll()
  } else {
    data = await LogRuangan.findAll({where: {id_ruangan: id}});
  }
  
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).send(id ? `Tidak ada entri pada log ruangan ${id}` : `Tidak ada entri pada log ruangan`);
  }
})

/**
 * @swagger
 *
 * /ruangan/jumlah-pengunjung:
 *  get:
 *    summary: Mendapatkan jumlah pengunjung pada ruangan dengan id tertentu
 *    tags:
 *      - Ruangan
 *    produces:
 *      - text/html
 *    parameters:
 *      - in: query
 *        name: id_ruangan
 *        type: string
 *        example: Suite_1102     
 *    responses:
 *      200:
 *        description: OK
 *        schema:
 *          type: Integer
 *          example: 15
 *      404:
 *        description: Not found, Kami tidak menemukan id ruangan yang diminta atau memang belum ada entri untuk log ruangan itu.
 *      500: 
 *        description: Internal Server Error
 */

router.get('/jumlah-pengunjung', async (req, res) => {
  let { id_ruangan } = req.query;
  
  if (id_ruangan) {
    try {
      await Pengunjung.sum('jumlah_pengunjung', {where: {current_ruangan: id_ruangan}})
      .then(data => {res.status(200).send(`${data || 0}`)})
      .catch(err => {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
      })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
  }

  res.status(404).send("Kami tidak menemukan id ruangan yang diminta atau memang belum ada entri untuk log ruangan itu.");
})

/**
 * @swagger
 *
 * /ruangan/page:
 *  get:
 *    summary: Dashboard untuk kontrol ruangan
 *    tags:
 *      - Pages
 *    produces:
 *      - text/html
 *    responses:
 *      200:
 *        description: OK
 */

router.get('/page', (req, res) => {
  res.render('ruangan', {title: "Dashboard Ruangan"});
})


module.exports = router;
