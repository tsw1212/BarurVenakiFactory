require('dotenv').config();
const Connect = require('./ConnectDB');

async function createCartItem(cartData) {
    return new Promise(async (resolve, reject) => {
        const connection =  Connect();
        try {
            let sql = 'INSERT INTO Cart SET ?';
            const cartResult = await query(connection, sql, {
                userId: cartData.userId,
                productId: cartData.productId,
                amount: cartData.amount,
                choose: cartData.choose
            });
            await connection.commit();
            const newCartItem = await getCartById(cartResult.insertId);
            resolve(newCartItem);
        } catch (error) {
            await connection.rollback();
            reject(new Error('Error inserting new cart item: ' + error));
        } finally {
            connection.end();
        }
    });
}

async function deleteCartItem(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM Cart WHERE id=?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting cart item with ${id} - ` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateCartItem(updatedCartData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE Cart SET ? WHERE id= ?';
        connection.query(sql, [updatedCartData, updatedCartData.id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating cart item: ' + err));
            } else {
                let updatedCart = await getCartById(updatedCartData.id);
                resolve(updatedCart);
            }
        });
    });
}
async function getCartById(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * from Cart WHERE id= ?';
        connection.query(sql, [id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error get cart item: ' + err));
            } else {

                resolve(result[0]);
            }
        });
    });
}

async function getAllCarts() {
    return new Promise(async (resolve, reject) => {
        const connection = Connect();

        try {
            let sql = `
                SELECT C.userId, C.productId, C.amount, C.choose, C.id,
                P.name, P.weight, P.package, P.imgUrl, P.inventory, P.price
                FROM Cart C
                LEFT JOIN Products P ON C.productId = P.id
            `;
            const cartDetails = await query(connection, sql);
            resolve(cartDetails);
        } catch (error) {
            reject(new Error('Error fetching all cart details: ' + error));
        } finally {
            connection.end();
        }
    });
}

async function getCartByUserId(userId) {
    return new Promise(async (resolve, reject) => {
        const connection = Connect();

        try {
            let sql = `
                SELECT C.userId, C.productId, C.amount, C.choose, C.id,
                P.name, P.weight, P.package, P.imgUrl, P.inventory, P.price
                FROM Cart C
                LEFT JOIN Products P ON C.productId = P.id
                WHERE C.userId = ?
            `;
            const cartDetails = await query(connection, sql, [userId]);
            // if(typeof cartDetails[0]=='object') {
            //     let cartArray=[];
            //     cartArray[0]=cartDetails[0];
            //     resolve(cartArray);
            // }
            // else 
            if(cartDetails.length==0){
                return resolve([]);
            }
            else{
                resolve(cartDetails);
            }

        } catch (error) {
            reject(new Error('Error fetching cart details: ' + error));
        } finally {
            connection.end();
        }
    });
}




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
    createCartItem,
    getAllCarts,
    getCartByUserId,
    deleteCartItem,
    updateCartItem,
    getCartById
};
