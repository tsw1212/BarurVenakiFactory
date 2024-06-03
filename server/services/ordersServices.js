const DB_actions = require('../DB_access/ordersDB_handler');

const OrdersServices= {
    createOrder: async (order) => {
        return await DB_actions.createOrder(order);
    },

    getAllOrders: async () => {
        return await DB_actions.getAllOrders();
    },

    getOrderById: async (id) => {
        return await DB_actions.getOrderById(id);
    },

    updateOrder: async (updatedOrderData) => {
        return await DB_actions.updateOrder(updatedOrderData);
    }, 

    deleteOrder: async (id) => {
        await DB_actions.deleteOrder(id);
    },
};

module.exports = OrdersServices;
