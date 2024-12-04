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

export default db;