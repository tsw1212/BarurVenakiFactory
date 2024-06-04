const FactoryServices = require("../../services/factoryServices");

const factoryController = {
    getAllFactories: async (req, res) => {
        try {
            const factories = await FactoryServices.getAllFactories();
            res.status(200).json(factories);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getFactoryByName: async (req, res) => {
        const name = req.params.name;
        try {
            const factory = await FactoryServices.getFactorieByName(name);
            if (!factory) {
                res.status(404).json({ error: "Factory not found" });
            } else {
                res.status(200).json(factory);
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createFactory: async (req, res) => {
        const factoryData = req.body;
        try {
            const newFactory = await FactoryServices.createFactory(factoryData);
            res.status(201).json(newFactory);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateFactory: async (req, res) => {
        const updatedFactoryData = req.body;
        try {
            const updatedFactory = await FactoryServices.updateFactory(updatedFactoryData);
            res.status(200).json(updatedFactory);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteFactory: async (req, res) => {
        const name = req.params.name;
        try {
            await FactoryServices.deleteFactory(name);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = factoryController;
