const express = require("express");
const app = express.Router();
const OrdersController = require('../controllers/ordersController')

app.get('/', OrdersController.getAllOrders);

app.get('/paged/:page', OrdersController.getOrdersByPage);

app.get('/:id', OrdersController.getOrderById);

app.post('/', OrdersController.createOrder);

app.put('/:id', OrdersController.updateOrder);

app.delete('/:id', OrdersController.deleteOrder);

module.exports = app;
