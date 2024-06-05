const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function updateProductOrder(updatedData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE productOrder SET ? WHERE productId = ? AND orderId = ?';

        connection.query(sql, [updatedData, updatedData.productId, updatedData.orderId], async (err, result) => {
            if (err) {
                connection.end();
                reject(new Error('Error updating productOrder:' + err));
            } else {
                try {
                    const updatedProductOrder = await getProductOrderById(updatedData.productId, updatedData.orderId);
                    connection.end();
                    resolve(updatedProductOrder);
                } catch (error) {
                    connection.end();
                    reject(new Error('Error retrieving updated productOrder: ' + error));
                }
            }
        });
    });
}

async function getProductOrderById(productId, orderId) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * FROM productOrder WHERE productId = ? AND orderId = ?';
        connection.query(sql, [productId, orderId], (err, results) => {
            connection.end();
            if (err) {
                reject(new Error('Error retrieving productOrder:' + err));
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = {
    updateProductOrder
};
