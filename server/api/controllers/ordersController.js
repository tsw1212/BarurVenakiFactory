const express = require("express");
const OrdersServices = require("../../services/ordersServices");
const validation = require('../../modules/validation');

const OrderController = {
    getAllOrders: async (req, res) => {
        // if (req.securityLevel !== "manager")
        //     res.status(401).json({ error: "unauthorized" });
        // else {
        try {
            let orders = await OrdersServices.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
        // }
    },
    getOrderById: async (req, res) => {
        // if (req.securityLevel !== "user" && req.securityLevel !== 'manager')
        //   return  res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            let order = await OrdersServices.getOrderById(id);
            if (!order) {
                res.status(404).json({ error: "order not found" });
            } else {
                res.status(200).json(order);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    createOrder: async (req, res) => {
        // if (req.securityLevel !== "user" && req.securityLevel !== 'manager')
        //     return res.status(401).json({ error: "unauthorized" });
        try {
            const order = req.body;
            order.status="התקבלה";
            if (!validation.validateOrdersInput(order)) {
                res.status(400).json({ error: 'invalid input' });
            } else {
                const newOrder = await OrdersServices.createOrder(order);
                res.status(200).json(newOrder);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    updateOrder: async (req, res) => {
        // if (req.securityLevel !== "user" && req.securityLevel !== 'manager')
        //   return  res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            let updatedOrderData = req.body;
            const datetime = new Date(updatedOrderData.date);
            const formattedDatetime = datetime.toISOString().slice(0, 19).replace('T', ' ');
            updatedOrderData.date = formattedDatetime;
            if (!validation.validateOrdersInput(updatedOrderData, true)) {
                res.status(400).json({ error: 'invalid input' });
            } else if (await OrdersServices.getOrderById(id) === null) {
                res.status(404).json({ error: "order not found" });
            } else {
                updatedOrderData = await OrdersServices.updateOrder(updatedOrderData);
                res.status(200).json(updatedOrderData);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    deleteOrder: async (req, res) => {
        if (req.securityLevel !== "user" && req.securityLevel !== 'manager')
            return  res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            if (await OrdersServices.getOrderById(id) === null) {
                res.status(404).json({ error: "order not found" });
            } else {
                await OrdersServices.deleteOrder(id);
                res.status(200).json({});
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }

    }
}

module.exports = OrderController;