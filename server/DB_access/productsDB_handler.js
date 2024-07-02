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
async function getNextProductId() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT MAX(id) + 1 AS next_id FROM Products';
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                const nextId = result[0].next_id || 1;
                resolve(nextId);
            }
        });
    });
}
// SELECT name, 
//                    imgUrl, 
//                    MIN(price) AS minPrice, 
//                    MAX(price) AS maxPrice 
//             FROM Products 
//             GROUP BY name, imgUrl
async function getAllShortListProducts() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `
        SELECT 
            p.name, 
            p.imgUrl, 
            prices.minPrice, 
            prices.maxPrice
        FROM 
            (SELECT 
                name, 
                imgUrl 
            FROM 
                (SELECT 
                    name, 
                    imgUrl, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
                FROM Products
             ) AS subquery
            WHERE row_num = 1
            ) AS p
        JOIN 
            (SELECT 
             name, 
             MIN(price) AS minPrice, 
             MAX(price) AS maxPrice
        FROM Products
        GROUP BY name
        ) AS prices
    ON p.name = prices.name;      
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
async function getProductByNameAndPackage(name, package) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Products WHERE name = ? AND package = ? `;
        connection.query(sql, [name, package], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function getProductsPaged(offset, limit) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Products LIMIT ?, ?`;
        connection.query(sql, [offset, limit], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function getProductsShortListPaged(offset, limit) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `
        SELECT 
            p.name, 
            p.imgUrl, 
            prices.minPrice, 
            prices.maxPrice
        FROM 
            (SELECT 
                name, 
                imgUrl 
            FROM 
                (SELECT 
                    name, 
                    imgUrl, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
                FROM Products
             ) AS subquery
            WHERE row_num = 1
            ) AS p
        JOIN 
            (SELECT 
             name, 
             MIN(price) AS minPrice, 
             MAX(price) AS maxPrice
        FROM Products
        GROUP BY name
        ) AS prices
    ON p.name = prices.name
    LIMIT ?, ?;
        `;
        connection.query(sql, [offset, limit], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
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

async function updateProductInventory(id, newInventory) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE Products SET inventory = ? WHERE id = ?';
        connection.query(sql, [newInventory, id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating product inventory:' + err));
            } else {
                let updatedProduct = await getProductById(id);
                resolve(updatedProduct);
            }
        });
    });
}

async function getFilteredSortedAndPaginatedProducts(filters) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        let sql = `
            SELECT 
                p.name, 
                p.imgUrl, 
                prices.minPrice, 
                prices.maxPrice
            FROM 
                (SELECT 
                    name, 
                    imgUrl 
                FROM 
                    (SELECT 
                        name, 
                        imgUrl, 
                        ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
                    FROM Products
                 ) AS subquery
                WHERE row_num = 1
                ) AS p
            JOIN 
                (SELECT 
                 name, 
                 MIN(price) AS minPrice, 
                 MAX(price) AS maxPrice
            FROM Products
            GROUP BY name
            ) AS prices
            ON p.name = prices.name
            WHERE 1=1`;

        const queryParams = [];

        // Apply filters
        for (const [key, value] of Object.entries(filters)) {
            if (key !== 'sort' && key !== 'page') { // Exclude 'sort' and 'page' parameters from WHERE clause
                if (key === 'package') {
                    sql += ` AND p.name IN (SELECT name FROM Products WHERE package = ? GROUP BY name)`;
                    queryParams.push(value);
                } else {
                    sql += ` AND ${key} = ?`;
                    queryParams.push(value);
                }
            }
        }

        // Add sorting logic
        if (filters.sort) {
            const sortDirection = filters.sort.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            sql += ` ORDER BY minPrice ${sortDirection}`; // Assuming sorting by minPrice
        }

        // Add pagination logic
        const page = parseInt(filters.page, 10) || 1;
        const pageSize = 10; // Fixed page size
        const offset = (page - 1) * pageSize;

        sql += ` LIMIT ?, ?`;
        queryParams.push(offset, pageSize);

        connection.query(sql, queryParams, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
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
    updateProduct,
    getProductByNameAndPackage,
    getNextProductId,
    getProductsPaged,
    getProductsShortListPaged,
    updateProductInventory,
    getFilteredSortedAndPaginatedProducts
};
