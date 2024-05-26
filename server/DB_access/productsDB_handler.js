const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function createProduct(productData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        let sql = 'INSERT INTO Products SET ?';
        connection.query(sql, productData, async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new product:' + err));
            } else {
                newProduct = await getProductById(result.insertId);
                resolve(newProduct);
            }
        });
    });
}

async function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM Products WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting product with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateProduct(updatedProductData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE Products SET ? WHERE id = ?';
        connection.query(sql, [updatedProductData, updatedProductData.id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating product:' + err));
            } else {
                let updatedProduct = await getProductById(updatedProductData.id);
                resolve(updatedProduct);
            }
        });
    });
}

async function getAllProducts() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * FROM Products';
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
async function getAllShortListProducts() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `
            SELECT name, 
                   imgUrl, 
                   MIN(price) AS minPrice, 
                   MAX(price) AS maxPrice 
            FROM Products 
            GROUP BY name, imgUrl
        `;
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                // Format the result into the desired 
                const groupedProducts = result.map(row => ({
                    name: row.name,
                    imgUrl: row.imgUrl,
                    minPrice: row.minPrice,
                    maxPrice: row.maxPrice
                }));
                resolve(groupedProducts);
            }
        });
    });
}
async function getProductByName(name) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Products WHERE name = ?`;
        connection.query(sql, [name], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
async function getProductById(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Products WHERE id = ?`;
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
    getProductById,
   createProduct,
   getAllProducts,
   getProductByName,
   deleteProduct,
   getAllShortListProducts,
   updateProduct
};
