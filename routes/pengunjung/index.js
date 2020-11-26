const express = require('express');
const router = express.Router();

const sequelize = require('../../services/database');
const { DataTypes } = require('sequelize');
const Pengunjung = require('../../db/models/Pengunjung')(sequelize, DataTypes);
const LogPengunjung = require('../../db/models/LogPengunjung')(sequelize, DataTypes);
const LogRuangan = require('../../db/models/LogRuangan')(sequelize, DataTypes);

router.get('/', (req, res) => {
  res.status(200).send("OK");
})

router.put('/', (req, res) => {
  res.status(200).send("OK")
})

router.get('/log', (req, res) => {
  res.status(200).send("OK")
})

router.get('/page', (req, res) => {
  res.render('pengunjung', {title: "Dashboard Pengunjung"});
})


module.exports = router;
