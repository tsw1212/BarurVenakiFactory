const express = require("express");
const ProductsServices = require("../../services/productsServices");
const validation = require('../../modules/validation');

const productsController = {
    getAllProducts: async (req, res) => {
        try {
            let products = await ProductsServices.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    getProductsShortList:async (req, res) => {
        try {
            let products = await ProductsServices.getAllShortListProducts();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "server internal error" });
        }
    },
    getProductById:async (req, res) => {
        try {
            const { id } = req.params;
            let product = await ProductsServices.getProductById(id);
            if (!product) {
                res.status(404).json({ error: "product not found" });
            } else {
                res.status(200).json(product);      
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "server internal error" });
        }
    },
    createProduct: async (req, res) => {
        if (req.securityLevel !== "manager")
            res.status(401).json({ error: "unauthorized" });
        else {
            try {
                const product = req.body;
                if (!validation.validateProductInput(product)) {
                    res.status(400).json({ error: 'invalid input' });
                } else {
                    const newProduct = await ProductsServices.createProduct(product);
                    res.status(200).json(newProduct);
                }
            } catch (error) {
                res.status(500).json({ error: "server internal error" });
            }
        }
    },
    updateProduct: async (req, res) => {
        // if (req.securityLevel !== "manager")
        //     res.status(401).json({ error: "unauthorized" });
        // else {
            try {
                const { id } = req.params;
                let updatedProductData = req.body;
                if (!validation.validateProductInput(updatedProductData, true)) {
                    res.status(400).json({ error: 'invalid input' });
                } else if (await ProductsServices.getProductById(id) === null) {
                    res.status(404).json({ error: "product not found" });
                } else {
                    updatedProductData = await ProductsServices.updateProduct(updatedProductData);
                    res.status(200).json(updatedProductData);
                }
            } catch (error) {
                res.status(500).json({ error: "server internal error" });
            }
        // }
    },
    deleteProduct: async (req, res) => {
        if (req.securityLevel !== "manager")
            res.status(401).json({ error: "unauthorized" });
        else {
            try {
                const { id } = req.params;
                if (await ProductsServices.getProductById(id) === null) {
                    res.status(404).json({ error: "product not found" });
                } else {
                    await ProductsServices.deleteProduct(id);
                    res.status(200).json({});
                }
            } catch (error) {
                res.status(500).json({ error: "server internal error" });
            }
        }
    }

}

module.exports = productsController;