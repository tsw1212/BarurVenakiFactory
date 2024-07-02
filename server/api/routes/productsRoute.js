const express = require("express");
const app = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const upload = multer();


app.get('/', productsController.getAllProducts);

app.get('/shortList', productsController.getProductsShortList);

app.get('/filter', productsController.getFilteredSortedAndPaginatedProducts);


app.get('/:name', productsController.getProductByName);

app.post('/', upload.single('imageFile'), productsController.createProduct);

app.put('/:id', upload.single('img'),productsController.updateProduct);

app.delete('/:id', productsController.deleteProduct);

app.get('/paged/:page', productsController.getProductsPaged);

app.get('/shortListPaged/:page', productsController.getProductsShortListPaged);


app.put('/inventory/:id', productsController.updateProductInventory);



module.exports = app;
