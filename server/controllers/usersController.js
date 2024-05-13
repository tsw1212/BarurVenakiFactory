const DB_actions = require('../DB_access/usersDB_handler');


const UsersController = {

    createUser: async (user) => {
        return await DB_actions.createUser(user);
    },

    getAllUsers: async () => {
        return await DB_actions.getAllUsers();
    },

    getUserById: async (id) => {
        return await DB_actions.getUserById(id);
    },

    getUserByEmail: async (email) => {
        return await DB_actions.getUserByEmail(email);
    },

    updateUser: async (updatedUserData) => {
        return await DB_actions.updateUser(updatedUserData);
    },

    deleteUser: async (id) => {
        await DB_actions.deleteUser(id);
    },

    getUserOrdersDetails: async (id) => {
        return await DB_actions.getUserOrdersDetails(id);
    }

};

module.exports = UsersController;

