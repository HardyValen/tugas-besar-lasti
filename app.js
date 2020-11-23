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
    version: '1.0.0'
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
