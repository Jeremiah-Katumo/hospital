import mysql from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

export const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const db = async () => {
    conn.getConnection(function(connection) {
        try {
            console.log('Database connected successfuly!');
            // connection.release();
        } catch (error) {
            console.error('Error connecting to MySQL:', error.message);
        }

        // if (err) {
        //     console.error('Error connecting to MySQL:', err.message);
        // } else {
        //     console.log('Database connected successfuly!');
        //     connection.release();
        // }
    });
}


export const signup = function(username, email, password, status, callback) {
    conn.query('SELECT email from users WHERE email = "'+email+'" ', function(err, result) {
        if (result[0] == undefined) {
            var query = "INSERT INTO `users`(`username`,`email`,`password`,'email_status`) VALUES('"+username+"','"+email+"','"+password+"','"+status+"')";
            console.log(query);
        } else {
            console.log("Error:", err.message);
        }  
    })
}

export const verify = function(username, email, token, callback) {
    var query = "INSERT INTO `verify`(`username`,`email`,`token`) VALUES('"+username+"','"+email+"','"+token+"')";
    conn.query(query, callback);
}

export const getuserid = function(email, callback) {
    var query = "SELECT * from verify WHERE email = `${email}`";
    conn.query(query, callback);
}

export const matchtoken = function(id, token, callback) {
    var query = "SELECT * from `verify` WHERE token = '"+token+"' and id = " +id ;
    conn.query(query, callback);
    console.log(query);
}

export const updateverify = function(email, email_status, callback) {
    var query = "UPDATE `users` SET email_status = '"+email_status+"' WHERE email = " +email ;
    conn.query(query, callback);
    console.log(query);
}

export default db;