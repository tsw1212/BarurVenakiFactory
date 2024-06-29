const express = require("express");
const app = express.Router();
const productOrderController = require('../controllers/productOrderController');

app.put('/', productOrderController.updateProductOrder);
 

module.exports = app;
