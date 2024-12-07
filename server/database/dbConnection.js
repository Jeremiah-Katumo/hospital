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

// Create a promise-based version of the connection for async/await
export const promiseConn = conn.promise();

// Function to test and initialize the database connection
const initializeDB = async () => {
    try {
        await promiseConn.getConnection(); // Test the connection
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
};

export default initializeDB;
