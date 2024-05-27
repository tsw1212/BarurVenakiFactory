const express = require("express");
const ProductsServices = require("../../services/productsServices");
const validation = require('../../modules/validation');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');


const productsController = {
    getAllProducts: async (req, res) => {
        try {
            let products = await ProductsServices.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    getProductsShortList: async (req, res) => {
        try {
            let products = await ProductsServices.getAllShortListProducts();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "server internal error" });
        }
    },
    getProductByName: async (req, res) => {
        try {
            const { name } = req.params;
            let product = await ProductsServices.getProductByName(name);
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
        // if (req.securityLevel !== "manager")
        //     res.status(401).json({ error: "unauthorized" });
        // else {
        try {
            const product = req.body;
            const imgName=await uploadProductImage(req, res);
            if (imgName) {
                const { imageFile, ...productDataWithoutImage } = product; 
                const productDataWithImgUrl = { ...productDataWithoutImage, imgUrl: imgName }; // Add imgUrl field
                
                if (!validation.validateProductInput(productDataWithImgUrl)) {
                    res.status(400).json({ error: 'invalid input' });
                } else {
                    const newProduct = await ProductsServices.createProduct(productDataWithImgUrl);
                    res.status(200).json(newProduct);
                }
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
        // }
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
        // if (req.securityLevel !== "manager")
        //     res.status(401).json({ error: "unauthorized" });
        // else {
        try {
            const { id } = req.params;
            await ProductsServices.deleteProduct(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
    // }



}
function uploadProductImage(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const { id } = req.params;
    const uploadedFile = req.files.imageFile;
    const newFileName = `${id}.png`;

    const uploadDir = 'C:/Users/tzivi/Desktop/BarurVenakiFactory/server/images';

    uploadedFile.mv(path.join(uploadDir, newFileName), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return newFileName;
    });
}
module.exports = productsController;