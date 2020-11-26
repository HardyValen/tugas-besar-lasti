require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');

// Swagger Config
const swaggerDefinition = {
  basePath: '/',
  info: {
    title: 'QR Code API Rumah Sakit Advent Bandung',
    description: "API Documentation untuk prototipe layanan cerdas QR Code untuk Rumah Sakit Advent, Bandung. Halaman utama layanan tersebut dapat diakses dengan [link ini](/). Anda harus menyalakan VPN ITB jika hostingnya masih di http://167.205.3.224:9000. ",
    version: '1.0.0',
  },
  definitions: {
    Pengunjung: {
      type: "object",
      properties: {
        id_pengunjung: {
          type: "uuid",
          format: "uuid v4",
        },
        nama_pengunjung: {
          type: "string"
        },
        jumlah_pengunjung: {
          type: "integer",
          min: "1",
          max: "100"
        },
        created_date: {
          type: "string",
          format: "datetime"
        },
        expired_date: {
          type: "string",
          format: "datetime"
        },
        permissions: {
          type: "id_ruangan",
          format: "id_ruangan[]",
        }
      }
    },

    Ruangan: {
      type: "object",
      description: "Bisa berupa ruangan fisik, seperti ruang inap, atau keseluruhan satu lantai gedung itu.",
      properties: {
        id_ruangan: {
          type: "string"
        },
        tipe_ruangan: {
          type: "string"
        }
      }
    },

    Log: {
      type: "object",
      description: "Transaksi check in dan check out, digunakan untuk keperluan logging",
      properties: {
        id_log: {
          type: "integer",
          format: "<sequence> int64"
        },
        id_pengunjung: {
          type: "id_pengunjung",
          format: "uuid v4"
        },
        "type": {
          type: "string",
          enum: ["check-in", "check-out"]
        },
        timestamp: {
          type: "string",
          format: "datetime"
        }
      }
    }
  }
}

const swaggerJSDocOptions = {
  definition: swaggerDefinition,
  apis: ['./routes/**/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({doctype: "<!DOCTYPE html>"}));


const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/static', express.static('public'));
app.use('/', indexRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;
