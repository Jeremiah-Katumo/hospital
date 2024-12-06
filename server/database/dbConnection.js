import mysql from 'mysql2';
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

export const promiseConn = conn.promise(); // Promise-based pool connection

const initializeDB = async () => {
    try {
        await promiseConn.getConnection();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
};

export default initializeDB;
