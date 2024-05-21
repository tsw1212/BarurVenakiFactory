const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function createPassword(passwordData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'INSERT INTO Passwords SET ?';
        connection.query(sql, passwordData, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new password: ' + err));
            } else {
                resolve(result);
            }
        });
    });
}

async function getPasswordByEmail(email) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * FROM Passwords WHERE email = ?';
        connection.query(sql, [email], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

async function updatePassword(passwordData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE Passwords SET password = ? WHERE email = ?';
        connection.query(sql, [passwordData.password, passwordData.email], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating password: ' + err));
            } else {
                resolve(result);
            }
        });
    });
}



module.exports = {
    createPassword,
    getPasswordByEmail,
    updatePassword
};
