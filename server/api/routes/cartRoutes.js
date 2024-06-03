const express = require("express");
const app = express.Router();
const cartController = require('../controllers/cartController');

app.get('/', cartController.getAllCarts);

app.get('/:userId', cartController.getCartByUserId);

app.post('/', cartController.createCartItem);

app.put('/:userId/:productId', cartController.updateCartItem);

app.delete('/:userId/:productId', cartController.deleteCartItem);

module.exports = app;
