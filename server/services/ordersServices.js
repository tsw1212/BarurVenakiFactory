const DB_actions = require('../DB_access/ordersDB_handler');
const sendEmail = require('../modules/email');
const usersServices = require('./usersServices');
const factoryServices = require('./factoryServices');


const OrdersServices = {
    createOrder: async (order) => {
        const newOrder = await DB_actions.createOrder(order);
        const factoryData = await factoryServices.getFactoryByName(process.env.FACTORY_NAME);
        const userData = await usersServices.getUserById(newOrder.orderInfo.userId);
        const emailTextManager = `!!הזמנה חדשה\n
        מספר הזמנה: ${newOrder.orderInfo.orderId}\n
        מספר משתמש: ${newOrder.orderInfo.userId}\n
        שם משתמש:${userData.username}\n
        תאריך הזמנה: ${newOrder.orderInfo.date}\n
        תאריך הספקה:${newOrder.orderInfo.deliveryDate}\n
        הערות:${newOrder.remarks}\n
        לצפיה בפרטי כל ההזמנות היכנס לאתר`;
        const emailTextUser = `הזמנתך התקבלה בהצלחה ותישלח אליך במועד המבוקש\n לצפייה בפרטי וסטטוס ההזמנה היכנס לאתר`;
        sendEmail(`נכנסה הזמנה חדשה!-${process.env.FACTORY_NAME}`, emailTextManager, factoryData.email);
        sendEmail(`הזמנתך התקבלה בהצלחה-${process.env.FACTORY_NAME}`, emailTextUser, userData.email);
        return newOrder;
    },

    getAllOrders: async () => {
        return await DB_actions.getAllOrders();
    },

    getOrdersByPage: async (page, pageSize) => {
        const offset = (page - 1) * pageSize;
        return await DB_actions.getOrdersByPage(offset, pageSize);
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
