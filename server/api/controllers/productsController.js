const express = require("express");
const ProductsServices = require("../../services/productsServices");
const validation = require('../../modules/validation');
// const fileUpload = require('express-fileupload');
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
        if (req.securityLevel != "manager")
            res.status(401).json({ error: "unauthorized" });
        else {
            try {
                const file = req.file;
                const product = req.body;
                if (!validation.validateProductInput(product)) {
                    res.status(400).json({ error: 'invalid input' });
                }
                else {
                    const checkProduct = await ProductsServices.getProductByNameAndPackage(product.name, product.package);
                    if (checkProduct.length == 0) {
                        const imgName = await uploadProductImage(file);
                        if (imgName) {
                            const productDataWithImgUrl = { ...product, imgUrl: imgName };
                            const newProduct = await ProductsServices.createProduct(productDataWithImgUrl);
                            res.status(200).json({newProduct});

                        }
                    }
                    else {
                        res.status(400).json({ error: 'product already exists' });
                    }


                }

            } catch (error) {
                console.log(error.message);
                res.status(500).json({ error: "server internal error" });
            }
        }
    },
    updateProduct: async (req, res) => {
        // if (req.securityLevel != "manager")
        //   return  res.status(401).json({ error: "unauthorized" });
        
            try {
                const file = req.file;
                const product = req.body;
                const { id } = req.params;
                if (!validation.validateProductInput(product)) {
                    res.status(400).json({ error: 'invalid input' });
                } else
                    if (await ProductsServices.getProductById(id) == undefined) {
                        res.status(404).json({ error: "product not found" });
                    } else {
                        const imgName = await uploadProductImage(file, id);
                        if (imgName) {
                            const productDataWithImgUrl = { ...product, imgUrl: imgName };
                            const newProduct = await ProductsServices.updateProduct(productDataWithImgUrl);
                            res.status(200).json({newProduct});

                        }
                    }
            } catch (error) {
                res.status(500).json({ error: "server internal error" });
            }
        
    },
    deleteProduct: async (req, res) => {
        if (req.securityLevel != "manager")
                return res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            const product = await ProductsServices.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            const imgPath = product.imgUrl;
            await ProductsServices.deleteProduct(id);
            if (imgPath) {
                const fullPath = path.resolve(__dirname, '', imgPath); 
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error("Failed to delete image:", err);
                    } else {
                        console.log("Image deleted:", fullPath);
                    }
                });
            }

        res.status(200).json({});
        } catch (error) {
            console.log(error.message);
            console.error("Error deleting product:", error);
            res.status(500).json({ error: "server internal error" });
        }
    }
}





async function uploadProductImage(file, id = null) {
    try {
        let newId = id;
        if (newId == null) {
            newId = await ProductsServices.getNextProductId();
        }
        console.log(2);
        const newFileName = `${newId}.png`;
        const uploadDir = path.join(__dirname, '../../images'); // Relative path to the images directory
        const fileBuffer = file.buffer;

        const filePath = path.join(uploadDir, newFileName);

        await fs.promises.writeFile(filePath, fileBuffer);

        // return `../../images/${newFileName}`;
        return filePath;
    } catch (error) {
        console.error('Error uploading product image:', error);
        throw error; // Re-throw the error to handle it in the caller function
    }
}

module.exports = productsController;