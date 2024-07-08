const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function createManager(managerData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        let sql = 'INSERT INTO Managers SET ?';
        connection.query(sql, managerData, async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new manager: ' + err));
            } else {
                let newManager = await getManagerById(result.insertId);
                resolve(newManager);
            }
        });
    });
}

async function deleteManager(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM Managers WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting manager with id: ${id} ` + err));
            } else {
                resolve();
            }
        });
    });
}



// async function getAllManagers() {
//     return new Promise((resolve, reject) => {
//         const connection = Connect();
//         const sql = 'SELECT * FROM Managers';
//         connection.query(sql, (err, result) => {
//             connection.end();
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

// // Retrieve a manager by ID
async function getManagerById(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Managers WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

module.exports = {
    createManager,
    // getAllManagers,
    getManagerById,
    deleteManager,

};
