import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import multer from 'multer';
import async from 'async';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import expressValidator from 'express-validator';
import sweetalert from 'sweetalert2';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { readdirSync } from 'fs';

import db from './server/database/dbConnection.js';
// import { signup, login } from './server/database/db.js';

dotenv.config();

const app = express();

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view_engine', 'ejs');
// app.set('server/views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/templates', express.static(path.join(__dirname, 'views', 'templates')));

app.use(express.static('./server/public/'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
// app.use('./signup', signup);

app.get('/', (req, res) => {
    res.redirect('/login');
})

// app.get('/api/v1/', (req, res) => {
//     res.redirect('/api/v1/login');
// })

const PORT = process.env.PORT || 3000;
const routePath = './server/routes';

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

const loadRoutes = async () => {
    const files = readdirSync(routePath);

    for (const file of files) {
        try {
            const module = await import(`${routePath}/${file}`);
            app.use('/', module.default);
        } catch (error) {
            console.error(`Error loading route from file ${file}:`, error);
        }
    }

    server();
}

loadRoutes();