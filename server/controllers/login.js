import express, { response } from 'express';
import bodyParser from 'body-parser';
import db from '../database/db.js';
import mysql from 'mysql2';
import session from 'express-session';
import sweetAlert from 'sweetalert2';
import { validationResult } from 'express-validator';
import { request } from 'http';
import { conn } from '../database/db.js';

// conn = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
// });

export const logIn = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.cookie('username', username);
                var status = results[0].email_status;

                if (status == "not_verified") {
                    response.send('Please make sure you verify your email!')
                } else {
                    sweetAlert.fire('Logged In');
                    response.redirect('/home');
                }
            } else {
                response.send('Incorrect user credentials!');
            }

            response.end()
        })
    } else {
        response.send('Please enter username and password!');
        response.end();
    }
}