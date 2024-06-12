const Connect = require('./ConnectDB');

async function createFactory(factoryData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        let sql = 'INSERT INTO Factory SET ?';
        connection.query(sql, factoryData, async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new factory:' + err));
            } else {
                newFactory = await getFactoryByName(factoryData.name);
                resolve(newFactory);
            }
        });
    });
}

async function deleteFactory(name) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM Factory WHERE name = ?`;
        connection.query(sql, [name], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting factory with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateFactory(updatedFactoryData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE Factory SET ? WHERE name = ?';
        connection.query(sql, [updatedFactoryData, updatedFactoryData.name], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating factory:' + err));
            } else {
                let updatedFactory = await getFactoryByName(updatedFactoryData.name);
                resolve(updatedFactory);
            }
        });
    });
}

async function getAllFactories() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * FROM Factory';
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



async function getFactoryByName(name) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM Factory WHERE name = ?`;
        connection.query(sql, [name], (err, result) => {
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
    createFactory,
    getAllFactories,
    deleteFactory,
    updateFactory,
    getFactoryByName
};
