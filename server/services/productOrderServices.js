const DB_actions = require('../DB_access/productOrderDB_handler');
const bcrypt = require('bcrypt');


const productOrderServices = {
    updateProductOrder: async (updatedData) => {
        return await DB_actions.updateProductOrder(updatedData);   
    }
};

module.exports = productOrderServices;