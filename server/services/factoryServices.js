const DB_actions = require('../DB_access/factoryDB_handler');

const FactoryServices = {
    createFactory: async (factoryData) => {
        const factory = await DB_actions.createFactory(factoryData);
        return factory;
    },

    getAllFactories: async () => {
        const factories = await DB_actions.getAllFactories();
        return factories;
    },
    getFactoryByName: async (name) => {
        const factories = await DB_actions.getFactoryByName(name);
        return factories;
    },



    updateFactory: async (updatedFactoryData) => {
        const updatedFactory = await DB_actions.updateFactory(updatedFactoryData);
        return updatedFactory;
    },

    deleteFactory: async (name) => {
        await DB_actions.deleteFactory(name);
    }

};

module.exports = FactoryServices;
