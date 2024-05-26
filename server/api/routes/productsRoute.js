const express = require("express");
const app = express.Router();
const productsController = require('../controllers/productsController')


app.get('/', productsController.getAllProducts);

app.get('/shortList', productsController.getProductsShortList);

app.get('/:id', productsController.getProductById);

app.post('/', productsController.createProduct);

app.put('/:id', productsController.updateProduct);

app.delete('/:id', productsController.deleteProduct);

module.exports = app;
