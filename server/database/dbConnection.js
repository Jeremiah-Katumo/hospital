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

export const promiseConn = conn.promise(); // Create a promise-based pool connection

const db = async () => {
    try {
        // Use promise-based connection pool
        const promisePool = conn.promise();

        // Test connection
        await promisePool.getConnection();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
};

export default db;
