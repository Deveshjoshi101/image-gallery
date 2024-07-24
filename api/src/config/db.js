const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Log when the pool is initialized
console.log('Database pool initialized.');

pool.on('connection', (connection) => {
    console.log('Database connected with threadId:', connection.threadId);
});

// Optional: Log when a connection is released back to the pool
pool.on('release', (connection) => {
    console.log('Connection released back to pool with threadId:', connection.threadId);
});

module.exports = pool;
