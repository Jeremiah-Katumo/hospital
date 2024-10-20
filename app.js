var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
var bodyParser = require('body-parser');
const http = require('http');
var db = require('./database/db');
var dotenv = require('dotenv');
var signup = require('./controllers/signup');


dotenv.config();

var app = express();

app.set('view_engine', 'ejs');
// const server = http.createServer(app);

app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookie());
app.use('./signup', signup);

const PORT = process.env.PORT || 3000

const server = () => {
    // db connection
    db();
    app.listen(PORT, () => {
        console.log(`Express is listening on: http://localhost:${PORT}` +
            '\n' + 'Press Ctrl + C to terminate');
    }).on('error', (err) => {
        console.log(err);
    });
};

// server.listen();
