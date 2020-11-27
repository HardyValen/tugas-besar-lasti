const express = require('express');
const router = express.Router();

const sequelize = require('../../services/database');
const { DataTypes } = require('sequelize');
const { v4 } = require('uuid');
const Pengunjung = require('../../db/models/Pengunjung')(sequelize, DataTypes);
const LogPengunjung = require('../../db/models/LogPengunjung')(sequelize, DataTypes);

/**
 * @swagger
 *
 * /pengunjung:
 *  get:
 *    summary: Fetch satu pengunjung berdasarkan id atau seluruh pengunjung
 */
router.get('/', async (req, res) => {
  let { id } = req.query;
  let data;

  if (!id) {
    data = await Pengunjung.findAll()
  } else {
    data = await Pengunjung.findAll({where: {id_pengunjung: id}}).catch(e => {
      res.status(400).send('Masukkan UUID Pengunjung dengan benar!')
    })
  }
  
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).send(id ? `Tidak menemukan pengunjung dengan id: ${id}` : `Tidak menemukan pengunjung`);
  }
})

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
 */
router.put('/', async (req, res) => {
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
    res.send(200).json(data);

  } catch (error) {
    await t.rollback();
    res.status(500).send(`Internal Server Error`)
  }

})

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

router.get('/page', (req, res) => {
  res.render('pengunjung', {title: "Dashboard Pengunjung"});
})


module.exports = router;
