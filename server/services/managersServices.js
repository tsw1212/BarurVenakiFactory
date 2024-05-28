const DB_actions = require('../DB_access/managerDB_handler');

const ManagersServices = {
    createManager: async (id) => {
        return await DB_actions.createManager(id);
    }
};

module.exports = ManagersServices;
