const express = require("express");
const app = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const upload = multer();


app.get('/', productsController.getAllProducts);

app.get('/shortList', productsController.getProductsShortList);

app.get('/:name', productsController.getProductByName);

app.post('/', upload.single('imageFile'), productsController.createProduct);

app.put('/:id', productsController.updateProduct);

app.delete('/:id', productsController.deleteProduct);


module.exports = app;
