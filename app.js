require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const handlebars = require('express-handlebars');

const indexRouter = require('./routes/index');

const app = express();

// app.set('view engine', 'handlebars');
// app.engine('handlebars', handlebars({
//   extname: 'handlebars',
//   layoutsDir: __dirname + '/views/layouts',
//   defaultLayout: 'index'
// }))
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

module.exports = app;
