const mysql = require('mysql');
require('dotenv').config();
const Connect = require('./ConnectDB');

async function createEvent(eventData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        let sql = 'INSERT INTO events SET ?';
        connection.query(sql, eventData, async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new event:' + err));
            } else {
                newevent = await getEventById(result.insertId);
                resolve(newevent);
            }
        });
    });
}

async function deleteEvent(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `DELETE FROM events WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting event with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateEvent(updatedEventData) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'UPDATE events SET ? WHERE id = ?';
        connection.query(sql, [updatedEventData, updatedEventData.id], async (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating event:' + err));
            } else {
                let updatedevent = await geteventById(updatedEventData.id);
                resolve(updatedevent);
            }
        });
    });
}

async function getAllEvents() {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = 'SELECT * FROM events';
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

async function getEventById(id) {
    return new Promise((resolve, reject) => {
        const connection = Connect();
        const sql = `SELECT * FROM events WHERE id = ?`;
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
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
    updateEvent
};
