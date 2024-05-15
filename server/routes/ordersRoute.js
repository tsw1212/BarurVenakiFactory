const express = require("express");
const app = express.Router();
const OrdersController = require("../controllers/ordersControllers");
const validation = require('../modules/validation');

app.get('/', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
    try {
        let orders = await OrdersController.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
}
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let order = await OrdersController.getOrderById(id);
        if (!order) {
            res.status(404).json({ error: "order not found" });
        } else {
            res.status(200).json(order);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.post('/', async (req, res) => {
    try {
        const order = req.body;
        if (!validation.validateOrdersInput(order)) {
            res.status(400).json({ error: 'invalid input' });
        } else {
            const newOrder = await OrdersController.createOrder(order);
            res.status(200).json(newOrder);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.put('/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        let updatedOrderData = req.body;
        if (!validation.validateOrdersInput(updatedOrderData, true)) {
            res.status(400).json({ error: 'invalid input' });
        } else if (await OrdersController.getOrderById(id) === null) {
            res.status(404).json({ error: "order not found" });
        } else {
            updatedOrderData = await OrdersController.updateOrder(updatedOrderData);
            res.status(200).json(updatedOrderData);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.delete('/:id', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
    try {
        const { id } = req.params;
        if (await OrdersController.getOrderById(id) === null) {
            res.status(404).json({ error: "order not found" });
        } else {
            await OrdersController.deleteOrder(id);
            res.status(200).json({});
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
}
});

module.exports = app;
