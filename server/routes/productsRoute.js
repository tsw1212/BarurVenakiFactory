const express = require("express");
const app = express.Router();
const ProductsController = require("../controllers/productsController");
const validation = require('../modules/validation');

app.get('/', async (req, res) => {
    try {
        let products = await ProductsController.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});
app.get('/shortList', async (req, res) => {
    try {
        let products = await ProductsController.getAllShortListProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server internal error" });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let product = await ProductsController.getProductById(id);
        if (!product) {
            res.status(404).json({ error: "product not found" });
        } else {
            res.status(200).json(product);      
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "server internal error" });
    }
});

app.post('/', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
        try {
            const product = req.body;
            if (!validation.validateProductInput(product)) {
                res.status(400).json({ error: 'invalid input' });
            } else {
                const newProduct = await ProductsController.createProduct(product);
                res.status(200).json(newProduct);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
});

app.put('/:id', async (req, res) => {
    // if (req.securityLevel !== "manager")
    //     res.status(401).json({ error: "unauthorized" });
    // else {
        try {
            const { id } = req.params;
            let updatedProductData = req.body;
            if (!validation.validateProductInput(updatedProductData, true)) {
                res.status(400).json({ error: 'invalid input' });
            } else if (await ProductsController.getProductById(id) === null) {
                res.status(404).json({ error: "product not found" });
            } else {
                updatedProductData = await ProductsController.updateProduct(updatedProductData);
                res.status(200).json(updatedProductData);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    // }
});

app.delete('/:id', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
        try {
            const { id } = req.params;
            if (await ProductsController.getProductById(id) === null) {
                res.status(404).json({ error: "product not found" });
            } else {
                await ProductsController.deleteProduct(id);
                res.status(200).json({});
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
});

module.exports = app;
