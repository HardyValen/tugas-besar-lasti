const express = require('express');
const router = express.Router();

const sequelize = require('../../services/database');
const { DataTypes } = require('sequelize');
const Ruangan = require('../../db/models/Ruangan')(sequelize, DataTypes);
const LogRuangan = require('../../db/models/LogRuangan')(sequelize, DataTypes);

router.get('/', async (req, res) => {
  let { id } = req.query;
  
  // Case 1: Return All (200)
  // Case 2: Return One ID (200)
  // Case 3: Has ID, Not Found (404)

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

router.put('/', async (req, res) => {
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
})

router.delete('/', async (req, res) => {
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
})

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

router.get('/jumlah-pengunjung', async (req, res) => {
  let { id_ruangan } = req.query;
  
  if (id_ruangan) {
    let data = await LogRuangan.findAll({
      limit: 1,
      where: {id_ruangan},
      order: [['waktu_log', 'DESC']]
    })

    if (data) {
      res.status(200).send(data[0].get("jumlah_pengunjung"))
    }
  }

  res.status(404).send("Kami tidak menemukan id ruangan yang diminta atau memang belum ada entri untuk log ruangan itu.");
})

router.get('/page', (req, res) => {
  res.render('ruangan', {title: "Dashboard Ruangan"});
})


module.exports = router;
