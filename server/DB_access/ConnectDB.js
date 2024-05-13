const mysql = require('mysql');
require('dotenv').config();

function connect() {
    const config = {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    };
    return mysql.createConnection(config);
}

module.exports = connect;