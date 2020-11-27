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
 *      400:
 *      404:
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
 * 
 * /pengunjung/update:
 *  post:
 *    summary: Sama seperti PUT /pengunjung
 *    tags:
 *      - Pengunjung 
 */

const updatePengunjung = async (req, res) => {
  const {
    id_pengunjung,
    nama_pengunjung,
    jumlah_pengunjung,
    permissions,
    expired_date
  } = req.body;

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
