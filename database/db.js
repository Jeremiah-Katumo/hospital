var mysql = require('mysql2');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

dotenv.config();

conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'hospital',
});

conn.getConnection(function(err, connection) {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Database connected successfuly!');
        connection.release();
    }
});

module.exports.signup = function(username, email, password, status, callback) {
    conn.query('SELECT email from users WHERE email = `${email}`');
    (err, result) => {
        if (result[0] == undefined) {
            var query = "INSERT INTO `users`(`username`,`email`,`password`,'email_status`) VALUES(`${username},${email},${password},${status}`)";
            console.log(query);
        } else {
            console.log("Error:", err.message);
        }  
    }
}

module.exports.verify = function(username, email, token, callback) {
    var query = "INSERT INTO `verify`(`username`,`email`,`token`) VALUES(`${username},${email},${token}`)";
    conn.query(query, callback);
}

module.exports.getuserid = function(email, callback) {
    var query = "SELECT * from verify WHERE email = `${email}`";
    conn.query(query, callback);
}