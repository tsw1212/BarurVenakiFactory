const DB_actions = require('../DB_access/productsDB_handler');

const ProductsController = {
    createProduct: async (product) => {
        return await DB_actions.createProduct(product);
    },

    getAllProducts: async () => {
        return await DB_actions.getAllProducts();
    },

    getProductById: async (id) => {
        return await DB_actions.getProductById(id);
    },

    updateProduct: async (updatedProductData) => {
        return await DB_actions.updateProduct(updatedProductData);
    },

    deleteProduct: async (id) => {
        await DB_actions.deleteProduct(id);
    },
};

module.exports = ProductsController;
