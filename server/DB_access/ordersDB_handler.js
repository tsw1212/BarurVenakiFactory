const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function createOrder(orderData) {
    return new Promise(async (resolve, reject) => {
        const connection = await Connect();
        try {
            let sql = 'INSERT INTO Orders SET ?';
            const orderResult = await query(connection, sql, {
                userId: orderData.userId,
                date: orderData.date,
                status: orderData.status,
                remarks: orderData.remarks
            });

            for (const product of orderData.products) {
                sql = 'INSERT INTO ProductOrder SET ?';
                const productOrderData = {
                    orderId: orderResult.insertId,
                    productId: product.productId,
                    amount: product.amount
                };
                await query(connection, sql, productOrderData);
            }

            await connection.commit();
            const newOrder = await getOrderById(orderResult.insertId);
            resolve(newOrder);
        } catch (error) {
            await connection.rollback();
            reject(new Error('Error inserting new order:' + error));
        } finally {
            connection.end();
        }
    });
}

async function deleteOrder(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM orders WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting order with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateOrder(updatedOrderData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE orders SET ? WHERE id = ?';
        connection.query(sql, [updatedOrderData, updatedOrderData.id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating order:' + err));
            } else {
                let updatedOrder = await getOrderById(updatedOrderData.id);
                resolve(updateOrder);
            }
        });
    });
}

async function getAllOrders() {
    return new Promise(async (resolve, reject) => {
        const connection = Connect();

        try {
            let sql = `
                SELECT O.id AS orderId, O.userId, O.date, O.status, O.remarks,
                P.productId, P.amount,
                E.id AS eventId, E.text AS eventText, E.date AS eventDate
                FROM Orders O
                LEFT JOIN ProductOrder P ON O.id = P.orderId
                LEFT JOIN Events E ON O.id = E.orderId
            `;
            const orderDetails = await query(connection, sql);

            const groupedOrders = groupByOrderId(orderDetails);

            resolve(groupedOrders);
        } catch (error) {
            reject(new Error('Error fetching all orders details: ' + error));
        } finally {
            connection.end();
        }
    });
}

async function getOrderById(orderId) {
    return new Promise(async (resolve, reject) => {
        const connection = Connect();

        try {
            let sql = `
            SELECT O.id AS orderId, O.userId, O.date, O.status, O.remarks,
            P.id AS productId, P.name, P.weight, P.package, P.imgUrl, P.inventory, P.price,
            PO.amount,  -- Include the amount field from ProductOrder
            E.id AS eventId, E.text AS eventText, E.date AS eventDate
            FROM Orders O
            LEFT JOIN ProductOrder PO ON O.id = PO.orderId
            LEFT JOIN Products P ON PO.productId = P.id
            LEFT JOIN Events E ON O.id = E.orderId
            WHERE O.id = ?

            `;
            const orderDetails = await query(connection, sql, orderId);

            const groupedOrderDetails = groupByOrderId(orderDetails);

            if (groupedOrderDetails.length === 0) {
                resolve(null);
            } else {
                resolve(groupedOrderDetails[0]);
            }
        } catch (error) {
            reject(new Error('Error fetching order details: ' + error));
        } finally {
            connection.end();
        }
    });
}


function groupByOrderId(orderDetails) {
    const grouped = {};
    orderDetails.forEach(row => {
        if (!grouped[row.orderId]) {
            grouped[row.orderId] = {
                orderInfo: {
                    orderId: row.orderId,
                    userId: row.userId,
                    date: row.date,
                    status: row.status,
                    remarks: row.remarks
                },
                products: [],
                events: []
            };
        }

        if (row.productId) {
            grouped[row.orderId].products.push({
                productId: row.productId,
                amount: row.amount,
                name: row.name,
                weight: row.weight,
                package: row.package,
                imgUrl: row.imgUrl,
                inventory: row.inventory,
            });
        }

        if (row.eventId) {
            grouped[row.orderId].events.push({
                eventId: row.eventId,
                text: row.eventText,
                date: row.eventDate
            });
        }
    });
    return Object.values(grouped);
}
//returning object in this format:{ 
//     orderInfo: { 
//         orderId: 1, 
//         userId: 123, 
//         date: '2024-05-14T08:30:00.000Z', 
//         status: 'Pending', 
//         remarks: 'Urgent delivery' 
//     },
//     products: [
//         { productId: 101, amount: 2 },
//         { productId: 102, amount: 1 }
//     ],
//     events: [
//         { eventId: 201, text: 'Order received', date: '2024-05-14T10:00:00.000Z' }
//     ]
// }


function query(connection, sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrder
};